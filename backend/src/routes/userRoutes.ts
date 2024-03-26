import express from "express";
import { registerController, registerValidation } from "../controller/userController";
const router = express.Router();

router.post("/register", registerValidation, registerController);

export default router;
