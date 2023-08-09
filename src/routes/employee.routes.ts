import express from 'express';
import { EmployeeController } from '../controllers/employee.controller';
import {verifyToken} from '../middlewares/employee.auth'
const router = express.Router();

router.post('/signup', EmployeeController.signup);
router.post('/login', EmployeeController.login);
router.get('/protected-resource', verifyToken, (req, res) => {
    res.status(200).json({ message: 'You have access to this protected resource.' });
  });
  router.post('/logout', EmployeeController.logout);  
  export default router;
