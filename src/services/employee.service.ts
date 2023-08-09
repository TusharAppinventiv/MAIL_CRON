//EmployeeService.js
import bcrypt from 'bcrypt'
import EmployeeModel from '../models/employee.model'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();
export class EmployeeService{
    static getEmployeeById(id: any) {
        return EmployeeModel.findOne({where : {id}})
    }
    static async createEmployee(employeeData){
        return EmployeeModel.create(employeeData);
    }

    static async findEmployeeByEmail(email){
        return EmployeeModel.findOne({where : {email}});
    }

    static async hashPassword(password){
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }

    static async generateAuthToken(employeeId){
        const token = jwt.sign({id: employeeId}, process.env.EMPLOYEE_KEY,{
            expiresIn: process.env.EXPIRES_IN,
        })
        return token;
    }
    static async findEmployeeByEmailAndPassword(email,password){
        const employee = await EmployeeModel.findOne({where: {email}});
        if(!employee){
            return null;
        }
        const isPasswordValid = await bcrypt.compare(password, employee.password);
        if(!isPasswordValid){
            return null;
        }
        const employeeId = employee? employee.id : null;
        return employeeId;
    }
    static async updateLoginStatus(employeeId, status) {
        // Assuming you have an Employee model and a status field
        const employee = await EmployeeModel.findByPk(employeeId);
    
        if (!employee) {
          throw new Error('Employee not found');
        }
    
        // Update the employee's status field
        employee.session = status;
        await employee.save();
      }
      
}
