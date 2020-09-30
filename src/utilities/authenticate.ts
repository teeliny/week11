import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Users from "../models/userSchema"
import {generateToken } from "./encrypt"

dotenv.config();

export async function verifyToken(req) {
    const email = "teeliny@gmail.com";
    
    const findUser = await Users.findOne({ email: email });
    if (findUser === null) {throw new Error("Wrong Auth");
    };

    const token = generateToken(findUser);
    findUser["token"] = token;
    // console.log(token);
    req.headers.authorization = token;
    
    if (token === undefined) {
        throw new Error("failed to generate token at this time");
    }
    return req;
};