import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';


// adding custom property on Express Request object
declare global {
    namespace Express {
        interface Request {
            userId: string          // custom property
        }
    }
}

export const verifyToken = async(req: Request, res: Response, next: NextFunction) => { 
    // when user signin and register we generate jwt token and send the token as cookie => res.cookie("auth_token", token, {})
    // so here we get this token from req.cookies object
 
    let token: string;

    const testToken: string = req.cookies?.["auth_token"] || req.headers?.authorization;
 
    if(testToken.startsWith("Bearer")){
        token = testToken.split(' ')[1];
    }
    else{
        token = testToken;
    }
    // console.log('verifyToken', token);

    if(!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string)

        // on req object we add custom property called userId. and assign value from decodedToken(value we set when jwt.sign())
        req.userId = (decodedToken as JwtPayload).userId;
        next();

    } catch (error) {
        return res.status(401).json({message: 'unauthorized'});
    }
 
}