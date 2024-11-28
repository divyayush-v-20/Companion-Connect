import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required"],
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
    stateIso2: {
        type: String,
        required: true
    },
    city: { 
        type: String,
        required: true
    }
}, {timestamps: true});

export const User = mongoose.model("User", userSchema);