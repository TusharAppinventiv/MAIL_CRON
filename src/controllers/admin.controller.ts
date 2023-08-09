import {AdminService} from '../services/admin.service';
import {AdminValidator, EmployeeValidator} from '../middlewares/validator'

export class AdminController{
    static async signup(req, res){
        try{
            const {error, value} = AdminValidator.signupSchema.validate(req.body);
        
        if(error){
            return res.status(400).json({error: error.details[0].message})
        }
        const existingEmployee = await AdminService.findAdminByEmail(value.email);
        if(existingEmployee){
            return res.status(409).json({error : 'Email is already registered'});
        }

        const hashedPassword = await AdminService.hashPassword(value.password);

        const newAdminData = {
            ...value,
            password: hashedPassword,
            session: false,
        };

        const newAdmin = await AdminService.createAdmin(newAdminData);
        return res.status(201).json({message: 'Signup successful', admin: newAdmin});
    }catch(err){
        console.error('Error during signup:', err);
        return res.status(500).json({ error: 'Internal server error'});
    }
 }
 static async login(req, res){
    try{
        const { error, value } = AdminValidator.loginSchema.validate(req.body);
        if(error){
            return res.status(400).json({ error: error.details[0].message })
        }

        const adminId = await AdminService.findAdminByEmailAndPassword(
            value.email,
            value.password
        );
        if(!adminId){
            return res.status(401).json({ error: 'Invalid credentails' });
        }
        const token = await AdminService.generateAuthToken(adminId);
        return res.status(200).json({ message: 'Login Successful', token});
    }catch (err){
        console.error('Error during login:', err);
        return res.status(500).json({ error: 'Internal server error'});
    }
 }
}