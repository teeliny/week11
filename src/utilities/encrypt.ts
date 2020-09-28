import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const encryptPassword = (newPassword: string) => bcrypt.hashSync(newPassword, 10);

export const decryptPassword = (checkPassword: string, encryptPassword: string) => bcrypt.compare(checkPassword, encryptPassword);

export const generateToken = (user: any) => {
    const payload = {
        id: user.id, email: user.email
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '72h'
    })
    return token;
}