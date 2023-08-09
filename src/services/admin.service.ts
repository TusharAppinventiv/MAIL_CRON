// AdminService.js
import bcrypt from 'bcrypt'
import AdminModel from '../models/admin.model'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config();
export class AdminService {
  static async createAdmin(adminData) {
    return AdminModel.create(adminData);
  }

  static async findAdminByEmail(email) {
    return AdminModel.findOne({ where: { email } });
  }

  static async hashPassword(password) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  static async generateAuthToken(adminId) {
    const token = jwt.sign({ id: adminId }, process.env.ADMIN_KEY, {
      expiresIn: process.env.EXPIRES_IN, // Token expiration time
    });
    return token;
  }

  static async findAdminByEmailAndPassword(email, password) {
   const admin = await AdminModel.findOne({ where: { email } });
    if (!admin) {
      return null; // Admin not found with the provided email
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return null; // Invalid password
    }
    const adminId = admin ? admin.id : null;
    return adminId;
  }
}
