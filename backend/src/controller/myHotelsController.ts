import { Request, Response } from "express";
import cloudinary from 'cloudinary'
import { Hotel, IHotel } from "../models/hotelModel";
import {body} from 'express-validator'

// // adding custom property on Express Request object
declare global {
    namespace Express {
        interface Request {
            userId: string          // custom property
        }
    }
}

export const myHotelValidation = [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("Price Per Night is required"),
    body("facilities").notEmpty().isArray().withMessage("Facilities are required"),
]

export const  myhotelController = async(req: Request, res: Response) => {
    try {
        const imageFiles = req?.files as  Express.Multer.File[];
        const newHotel: IHotel = req.body;
        
        
        // upload image to cloudinary
        const  uploadedImages = imageFiles && imageFiles.map(async(image)=>{
            const b64 = Buffer.from(image.buffer).toString('base64'); // converting image to base64 string
            let dataUri = "data:" + image.mimetype + ";base64,"+b64 ;//creating a data uri for the image // mimetype means type of format eg. .jpg / .jpeg / .png
            const res = await cloudinary.v2.uploader.upload(dataUri); //sending request to cloudinary server to store
            console.log('uploadedImages cloudinary => ', res)
            return res.url
        })
        // before carry on let await for all the above promises to finish its executing
        const imageUrls = await Promise.all(uploadedImages);


        // if upload success, add url to new hotels object and save it in database
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        
        newHotel.userId = req?.userId;      // on register and login we added userId property on req object

        const hotel = new Hotel(newHotel);   // create an instance of our model
        const savedHotel = await hotel.save()  // save this new hotel info into the database

        return res.status(201).json({hotel: savedHotel})


    } catch (error) {
        console.log("Error while  adding new Hotel ", error);
        return res.status(500).json({message: "Internal Server Error" });
    }
}