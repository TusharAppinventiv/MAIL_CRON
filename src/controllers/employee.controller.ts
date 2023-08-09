import {EmployeeService} from '../services/employee.service';
import {EmployeeValidator} from '../middlewares/validator'

export class EmployeeController{
    static async signup(req, res){
        try{
            const {error, value} = EmployeeValidator.signupSchema.validate(req.body);
        
        if(error){
            return res.status(400).json({error: error.details[0].message})
        }
        const existingEmployee = await EmployeeService.findEmployeeByEmail(value.email);
        if(existingEmployee){
            return res.status(409).json({error : 'Email is already registered'});
        }

        const hashedPassword = await EmployeeService.hashPassword(value.password);

        const newEmployeeData = {
            ...value,
            password: hashedPassword,
            session: false,
        };

        const newEmployee = await EmployeeService.createEmployee(newEmployeeData);
        return res.status(201).json({message: 'Signup successful', employee: newEmployee});
    }catch(err){
        console.error('Error during signup:', err);
        return res.status(500).json({ error: 'Internal server error'});
    }
 }
 static async login(req, res) {
    try {
      const { error, value } = EmployeeValidator.loginSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const employeeId = await EmployeeService.findEmployeeByEmailAndPassword(
        value.email,
        value.password
      );
  
      if (!employeeId) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      // Update user's login status to true
      await EmployeeService.updateLoginStatus(employeeId, true);
  
      const token = await EmployeeService.generateAuthToken(employeeId);
      return res.status(200).json({ message: 'Login Successful', token });
    } catch (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  static async logout(req, res) {
    try {
      // Get the user ID from the request body
      const employeeId = req.body.employeeId;
  
      // Update the user's login status to false
      await EmployeeService.updateLoginStatus(employeeId, false);
  
      // Return a success message
      return res.status(200).json({ message: 'Logout Successful' });
    } catch (err) {
      console.error('Error during logout:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  
}
