import express from 'express';
import {DSRController} from '../controllers/dsr.controller';
import {verifyToken} from '../middlewares/employee.auth'
import { verifyAdmin } from '../middlewares/admin.auth';

const router = express.Router();
router.post('/create', DSRController.createDSR);
router.post('/edit', DSRController.editDSR);
router.delete('/protected-resource', DSRController.deleteDSR)
router.put('/admin/:dsrId/accept', verifyAdmin, DSRController.acceptPendingDSR);

export default router;
