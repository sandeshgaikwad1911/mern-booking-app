import express, { Request, Response } from "express";
import { loginController, loginValidation, tokenValidationController } from "../controller/authController";
import { verifyToken } from "../middleware/authMiddleware";
import { User } from "../models/userModel";


const router = express.Router();

router.post("/login", loginValidation, loginController);

router.get("/validate-token", verifyToken, tokenValidationController);

router.delete("/delete", async(req: Request, res: Response)=>{
    await User.deleteMany({});
    return res.status(200).json({message: "all users deleted"});
})

export default router;