import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import  authRoutes from './routes/authRoutes';
import myHoteRoutes from './routes/myHotelsRoutes'
import { connectDB } from './configuration/dbConnection';
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';
dotenv.config();

import {v2 as cloudinary} from 'cloudinary';         
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.Frontend_Url,
    credentials: true,
}));


app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/my-hotel", myHoteRoutes);

const port = 7000;
app.listen(port, ()=>{
    connectDB();
    console.log(`application is running on http://127.0.0.1:${port}`);
})

// lv0gsGUSTHTCM5m6