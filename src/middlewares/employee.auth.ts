import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if(!token){
        return res.status(403).json({error: 'Access deniend. Token is missing'});
    }

    jwt.verify(token, process.env.EMPLOYEE_KEY, (err, decoded)=> {
        if(err){
            return res.status(401).json({error: 'Invalid token.'});
        }

        req.employeeId = decoded.id;
        next();
    });
}