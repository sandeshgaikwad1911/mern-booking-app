import { Request, Response } from "express";
import { User } from "../models/userModel";
import { check, validationResult } from "express-validator";
import jwt from 'jsonwebtoken';
import { IUser } from "../models/userModel";

export const registerValidation = [
    check("firstname", "First name is required").isString(),
    check("lastname", "Last name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({min: 6})
]

export const registerController = async(req: Request, res: Response) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {

        let user = await User.findOne({email: req.body.email});
  
        if(user) {
          return res.status(400).json({message: "This email is already is use."})
        }
  
        user = new User(req.body);
        await user.save();
  
        const token = jwt.sign({userId: user._id, userEmail: user.email}, process.env.JWT_SECRET as string, {expiresIn: "1d"});
        
        res.cookie("auth_token", token, {
          httpOnly: true,
          secure: process.env.Node_Environment == "production" ? true : false,
          maxAge: 1000 * 60 * 60 * 24, //  1d in milisecond
        });
  
        return res.status(201).json({ message: "user registered successfully", token: token});
  
      } catch (error) {
        console.log("registerError", error);
        return res.status(500).json({ message: "Something went wrong while register a new user." });
      }
  
      
}