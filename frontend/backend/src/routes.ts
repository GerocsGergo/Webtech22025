import express from 'express';
import {VersionController} from './controllers/version.controller'
import { Router } from 'express';
import { AppDataSource } from './data-source';
import { StaffController } from './controllers/staff.controller';
import { AdminController } from './controllers/admin.controller';

const router = Router();

//Version
const versionController = new VersionController();
router.get('/version', versionController.getVersion);

//User
const staffController = new StaffController();
router.post('/loginStaff', staffController.loginStaff);
router.get('/listAllStaff', staffController.listAllStaff);
router.post('/createStaff', staffController.createStaff);
router.put('/modifyStaff/:id', staffController.modifyStaff);
router.put('/deleteStaff/:id', staffController.deleteStaff);
router.put('/activateStaff/:id', staffController.activateStaff);

//User
const adminController = new AdminController();
router.post('/loginAdmin', adminController.loginAdmin);
router.get('/getCurrentAdmin', adminController.getCurrentAdmin);
router.post('/createAdmin', adminController.createAdmin);
router.put('/modifyAdmin/:id', adminController.modifyAdmin);
router.put('/deleteAdmin/:id', adminController.deleteAdmin);
router.put('/activateAdmin/:id', adminController.activateAdmin);



export { router };