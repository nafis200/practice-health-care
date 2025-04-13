import express, { NextFunction, Request, Response } from 'express';
import { AdminController } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { adminValidationSchemas } from './admin.validation';


const router = express.Router();

router.get(
    '/',AdminController.getAllFromDB
);

router.patch(
    '/:id',
    // auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
    validateRequest(adminValidationSchemas.update),
    AdminController.updateIntoDB
);


router.delete(
    '/:id',
    AdminController.deleteFromDB
);

router.delete(
    '/soft/:id',
    AdminController.softDeleteFromDB
);

export const AdminRoutes = router;