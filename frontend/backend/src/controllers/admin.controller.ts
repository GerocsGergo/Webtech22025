import { Request, Response } from 'express';
import { Admin } from '../entity/Admin';
import { AppDataSource } from '../data-source';
import bcrypt, { compare } from 'bcrypt';
import { AdminResponseDTO } from '../../../models';


export class AdminController {

    private adminRepository = AppDataSource.getRepository(Admin);

    loginAdmin = async (req, res) => {
        try {
          const { username, password, code } = req.body;
    
          if (!username || !password || !code) {
            return res.status(400).json({ message: 'Felhasználónév, jelszó és kód szükséges.' });
          }
    
          const admin = await this.adminRepository.findOneBy({ username });
    
          if (!admin) {
            return res.status(404).json({ message: 'Felhasználó nem található.' });
          }
        
          const isCodeValid = await bcrypt.compare(code, admin.code);

          const isPasswordValid = await bcrypt.compare(password, admin.password);
    
          if (!isPasswordValid) {
            return res.status(401).json({ message: 'Hibás jelszó.' });
          }

          if (!isCodeValid) {
            return res.status(401).json({ message: 'Hibás kód.' });
          }

          if (!admin.isActive) {
            return res.status(403).json({ message: 'Az admin fiók inaktív.' });
          }

          req.session.adminId = admin.id;
          req.session.username = admin.username; 
    
          // Kiszedjuk a passwordot és a kódot a vissza küldött jsonbol
          const { password: _omit, code: _omitCode, ...adminWithoutSensitive } = admin;    
    
          return res.json(adminWithoutSensitive as AdminResponseDTO);
    
        } catch (err) {
          this.handleError(res, err);
        }
    }

    getCurrentAdmin = async (req, res) => {
      if (!req.session.adminId) {
        return res.status(401).json({ message: 'Nem vagy bejelentkezve.' });
      }
    
      const admin = await this.adminRepository.findOneBy({ id: req.session.adminId });
      if (!admin) {
        return res.status(404).json({ message: 'Admin nem található.' });
      }
    
      // pl. csak username és jogosultságok, nem kell minden adat
      return res.json({
        id: admin.id,
        username: admin.username,
        isSuperAdmin: admin.username.toLowerCase() === 'superadmin',
        isActive: admin.isActive
      });
    }
    

    createAdmin = async (req, res) => {
        try {
          const { username, password, code } = req.body;
      
          if (!username || !password || !code) {
            return res.status(400).json({ message: 'Felhasználónév, jelszó és kód szükséges.' });
          }
      
          const existingAdmin = await this.adminRepository.findOneBy({ username });
          if (existingAdmin) {
            return res.status(409).json({ message: 'Ez a felhasználónév már foglalt.' });
          }

          if (username.toLowerCase() === 'superadmin') {
            return res.status(403).json({ message: 'Ez a felhasználónév már foglalt.' });
          }
          
      
          const hashedPassword = await bcrypt.hash(password, 10);
          const hashedCode = await bcrypt.hash(code, 10);
      
          const newAdmin = this.adminRepository.create({
            username,
            password: hashedPassword,
            code: hashedCode,
          });
      
          await this.adminRepository.save(newAdmin);
      
          const { password: _omitPwd, code: _omitCode, ...adminWithoutSensitive } = newAdmin;
      
          return res.status(201).json(adminWithoutSensitive);
      
        } catch (err) {
          this.handleError(res, err);
        }
      }
      

      modifyAdmin = async (req, res) => {
        try {
          const id = parseInt(req.params.id);  // ide jön az id a route-ból
          const { newPassword, newCode } = req.body;
      
          const admin = await this.adminRepository.findOneBy({ id });
          if (!admin) {
            return res.status(404).json({ message: 'Admin nem található.' });
          }
      
          if (admin.username.toLowerCase() === 'superadmin') {
            return res.status(403).json({ message: 'A superadmin nem módosítható.' });
          }          
      
          if (newPassword) {
            admin.password = await bcrypt.hash(newPassword, 10);
          }
      
          if (newCode) {
            admin.code = await bcrypt.hash(newCode, 10);
          }
      
          await this.adminRepository.save(admin);
      
          return res.json({ message: 'Admin frissítve.' });
      
        } catch (err) {
          this.handleError(res, err);
        }
      }
      
      

      deleteAdmin = async (req, res) => {
        try {
          const { id } = req.params;
          const admin = await this.adminRepository.findOneBy({ id: parseInt(id) });
      
          if (!admin) {
            return res.status(404).json({ message: 'Admin nem található.' });
          }
      
          if (admin.id === req.currentAdminId) {
            return res.status(400).json({ message: 'Nem törölheted saját magad.' });
          }
      
          if (admin.username === 'superadmin') {
            return res.status(400).json({ message: 'A superadmin nem törölhető.' });
          }
      
          admin.isActive = false;
          await this.adminRepository.save(admin);
      
          return res.json({ message: 'Admin deaktiválva.' });
      
        } catch (err) {
          this.handleError(res, err);
        }
      }
      
      activateAdmin = async (req, res) => {
        try {
          const { id } = req.params;
          const admin = await this.adminRepository.findOneBy({ id: parseInt(id) });
      
          if (!admin) {
            return res.status(404).json({ message: 'Admin nem található.' });
          }
      
          if (admin.id === req.currentAdminId) {
            return res.status(400).json({ message: 'Nem aktiválhatod saját magad.' });
          }
      
          if (admin.username === 'superadmin') {
            return res.status(400).json({ message: 'A superadmin nem aktiválható.' });
          }
      
          admin.isActive = true;
          await this.adminRepository.save(admin);
      
          return res.json({ message: 'Admin aktiválva.' });
      
        } catch (err) {
          this.handleError(res, err);
        }
      }

    handleError = (res: Response, err: any, status = 500, message = 'Unknown server error.') => {
        if (err) {
            console.error(err);
        }
        res.status(status).json({ message });
    }

    
}
