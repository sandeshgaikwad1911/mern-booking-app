import express, { Request, Response } from "express";
import { loginController, loginValidation } from "../controller/authController";
import { verifyToken } from "../middleware/authMiddleware";
import { User } from "../models/userModel";


const router = express.Router();

router.post("/login", loginValidation, loginController);

// -------------------------- Protected Routes -------------------------------------

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
     return res.status(200).json({userId: req.userId});
});

// -----------------------------------------------------------------------------------

router.post("/logout", (req: Request, res: Response)=>{
    res.cookie("auth_token", "", {
        expires: new Date(0)
    })
    return res.status(201).json({message: "User sign out successfully."});
})

// -----------------------------------------------------------------------------------

router.delete("/delete", async(req: Request, res: Response)=>{
    await User.deleteMany({});
    return res.status(200).json({message: "all users deleted"});
})

export default router;