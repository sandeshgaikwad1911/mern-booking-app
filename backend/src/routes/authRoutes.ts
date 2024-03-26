import express from "express";
import { authController, authValidation } from "../controller/auth";
const router = express.Router();

router.post("/login", authValidation, authController);

export default router;