import express from 'express';
import { AdminController } from '../controllers/admin.controller';
import {verifyAdmin} from '../middlewares/admin.auth'
const router = express.Router();

router.post('/signup', AdminController.signup);
router.post('/login', AdminController.login);
router.get('/protected-resource', verifyAdmin, (req, res) => {
    res.status(200).json({ message: 'You have access to this protected resource.' });
  });
  
export default router;
