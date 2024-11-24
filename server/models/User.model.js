import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        minLength: [6, "Username must be atleast 6 characters"],
        required: [true, "Username is required"],
    }, 
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: [true, "Email is required"],
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        minLength: [6, "Password must be atleast 6 characters"], 
        required: [true, "Password is required"]
    },
}, {timestamps: true});