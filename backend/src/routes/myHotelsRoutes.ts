import express from 'express'
import { myHotelValidation, myhotelController } from '../controller/myHotelsController';
const router = express.Router();
import multer from 'multer';
import { verifyToken } from '../middleware/authMiddleware';

const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // Maximum size is 5MB
    },
    
})

router.post("/", verifyToken, myHotelValidation, upload.array("imageFiles", 5), myhotelController)
//  verifyToken => only login user can create hotel
// imageFiles is name of the field and 5 is max number of images can hold the field
// on req object, it adds 'files' property

export default router;