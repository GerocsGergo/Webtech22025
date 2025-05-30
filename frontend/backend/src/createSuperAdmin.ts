import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();

import { DataSource } from 'typeorm';
import { Admin } from './entity/Admin';

import { AppDataSource } from './data-source';

async function createSuperAdmin() {
  try {
    await AppDataSource.initialize();

    const adminRepository = AppDataSource.getRepository(Admin);

    const username = process.env.SUPERADMIN_USERNAME;
    const password = process.env.SUPERADMIN_PASSWORD;
    const code = process.env.SUPERADMIN_CODE;

    const existingAdmin = await adminRepository.findOneBy({ username });

    if (existingAdmin) {
      console.log('Superadmin már létezik az adatbázisban.');
      return;
    }

    const bcrypt = await import('bcrypt');
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedCode = await bcrypt.hash(code, 10);

    const superAdmin = adminRepository.create({
      username,
      password: hashedPassword,
      code: hashedCode,
      isActive: true,
    });

    await adminRepository.save(superAdmin);

    console.log('Superadmin sikeresen létrehozva.');

    await AppDataSource.destroy();
  } catch (error) {
    console.error('Hiba a superadmin létrehozása közben:', error);
  }
}

createSuperAdmin();
