import mongoose from "mongoose";

export const connectDB = ()=>{
    mongoose.connect(process.env.MONGODB_CONNECTION as string,{
    }).then(()=>{
        console.log("connection to the database is successful");
    }).catch((error)=>{
        console.log(`Error connecting to MongoDB: ${error}`);
    })
}