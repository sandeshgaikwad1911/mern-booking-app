import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser{
    _id: string,
    email: string,
    password: string,
    firstname: string,
    lastname: string,
}

const userSchema = new mongoose.Schema<IUser>({ 
    email: { 
        type: String,
        required: true,
        unique: true
        
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true,
        lowerCase: true
    },
    lastname: {
        type: String,
        required: true,
        lowerCase: true
    }
}, {timestamps: true});

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

export const User = mongoose.model<IUser>('User', userSchema);


