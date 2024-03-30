import {Request, Response} from 'express';
import { User } from '../models/userModel';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// -----------------------------------------------------------------------
// express-validator validation
export const loginValidation = [
    check("email", "Please provide valid email address").isEmail(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 })   
]

export const loginController = async(req: Request, res: Response,) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({message: errors.array()});
    }

    try {

        const user = await User.findOne( { email : req.body.email } );
        if(!user) {
            return res.status(400).json({message: "user does not exist."});
        }

        // compare password if user found
        const  isMatched = await bcrypt.compare(req.body.password, user.password);
        if (!isMatched) {
            return res.status(400).json({message: "Invalid Credentials."});
        }

        const token = jwt.sign({userId: user._id, userEmail: user.email}, process.env.JWT_SECRET as string, {expiresIn: "1d"});
        
        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.Node_Environment == "production" ? true : false,
            maxAge: 1000 * 60 * 60 * 24, //  1d in milisecond
          })

          return res.status(200).json({ userId: user._id, token: token});

    } catch (error) {
        console.log("Login Error", error);
        return res.status(500).json({message: "something went wrong while logIn"});
    }
}


// -----------------------------------------------------------------------
