import { Request, Response } from 'express';
import { Staff } from '../entity/Staff';
import { AppDataSource } from '../data-source';
import bcrypt from 'bcrypt';

export class StaffController {

  private staffRepository = AppDataSource.getRepository(Staff);

  loginStaff = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ message: 'Felhasználónév és jelszó szükséges.' });
      }
  
      const staff = await this.staffRepository.findOneBy({ username });
  
      if (!staff) {
        return res.status(404).json({ message: 'Felhasználó nem található.' });
      }
  
      if (!staff.isActive) {
        return res.status(403).json({ message: 'A felhasználó inaktív.' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, staff.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Hibás jelszó.' });
      }
  
      const { password: _omit, ...staffWithoutPassword } = staff;
  
      return res.json(staffWithoutPassword);
  
    } catch (err) {
      return this.handleError(res, err);
    }
  }
  

  createStaff = async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: 'Felhasználónév és jelszó szükséges.' });
      }


      const existingStaff = await this.staffRepository.findOneBy({ username });
      if (existingStaff) {
        return res.status(409).json({ message: 'A felhasználónév már létezik.' });
      }


      const hashedPassword = await bcrypt.hash(password, 10);

      const newStaff = this.staffRepository.create({
        username,
        password: hashedPassword,
        isActive: true,
      });

      await this.staffRepository.save(newStaff);

  
      const { password: _omit, ...staffWithoutPassword } = newStaff;

      return res.status(201).json(staffWithoutPassword);
    } catch (err) {
      return this.handleError(res, err);
    }
  }

  getStaffById = async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (!id) {
        return res.status(400).json({ message: 'Érvénytelen azonosító.' });
      }
  
      const staff = await this.staffRepository.findOneBy({ id });
      if (!staff) {
        return res.status(404).json({ message: 'Felhasználó nem található.' });
      }
  
      const { password: _omit, ...staffWithoutPassword } = staff;
      return res.json(staffWithoutPassword);
  
    } catch (err) {
      return this.handleError(res, err);
    }
  }

  modifyStaff = async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (!id) {
        return res.status(400).json({ message: 'Érvénytelen azonosító.' });
      }
  
      const staff = await this.staffRepository.findOneBy({ id });
      if (!staff) {
        return res.status(404).json({ message: 'Felhasználó nem található.' });
      }
  
      const { username, password} = req.body;
  
      if (username !== undefined) {
        const userWithSameUsername = await this.staffRepository.findOneBy({ username });
        if (userWithSameUsername && userWithSameUsername.id !== id) {
          return res.status(409).json({ message: 'A felhasználónév már foglalt.' });
        }
        staff.username = username;
      }
  
      if (password !== undefined) {
        staff.password = await bcrypt.hash(password, 10);
      }
  
      await this.staffRepository.save(staff);
  
      const { password: _omit, ...staffWithoutPassword } = staff;
      res.json({ message: 'Dolgozó sikeresen frissítve!', staff: staffWithoutPassword });
  
    } catch (err) {
      this.handleError(res, err);
    }
  }
  

  deleteStaff = async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (!id) {
        return res.status(400).json({ message: 'Érvénytelen azonosító.' });
      }
  
      const staff = await this.staffRepository.findOneBy({ id });
      if (!staff) {
        return res.status(404).json({ message: 'Felhasználó nem található.' });
      }
  
      staff.isActive = false;
      await this.staffRepository.save(staff);
  
      const { password: _omit, ...staffWithoutPassword } = staff;
      return res.json({ message: 'Felhasználó sikeresen inaktiválva.', staff: staffWithoutPassword });
    } catch (err) {
      return this.handleError(res, err);
    }
  }
  

  activateStaff = async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (!id) {
        return res.status(400).json({ message: 'Érvénytelen azonosító.' });
      }

      const staff = await this.staffRepository.findOneBy({ id });
      if (!staff) {
        return res.status(404).json({ message: 'Felhasználó nem található.' });
      }

      staff.isActive = true;
      await this.staffRepository.save(staff);

      const { password: _omit, ...staffWithoutPassword } = staff;
      return res.json(staffWithoutPassword);
    } catch (err) {
      return this.handleError(res, err);
    }
  }

  listAllStaff = async (req, res) => {
    try {
      const allStaff = await this.staffRepository.find();

      // Remove password from each staff
      const safeStaffList = allStaff.map(({ password, ...rest }) => rest);

      return res.json(safeStaffList);
    } catch (err) {
      return this.handleError(res, err);
    }
  };

  handleError(res: Response, err: any, status = 500, message = 'Unknown server error.'): Response {
    if (err) {
      console.error(err);
    }
    return res.status(status).json({ message });
  }

}
