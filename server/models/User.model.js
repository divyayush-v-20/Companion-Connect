import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/constants.js";

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

const User = mongoose.model("User", userSchema);

// User.signIn = async(user, successCallback, errorCallback) => {
//     try{
//         const dbRes = await User.findOne({email: user.email});
//         if(dbRes){
//             console.log("SignIn | dbRes is: ", dbRes);
//             const matchPass = bcrypt.compareSync(user.password, dbRes.password);
//             if(matchPass){
//                 const authToken = jwt.sign({email: dbRes.email}, JWT_SECRET_KEY, {
//                     expiresIn: "1h",
//                 });
//                 return successCallback({token: authToken});
//             }
//             else{
//                 errorCallback({status: 401, message: "Invalid Password"});
//             }
//         }
//         else{
//             return errorCallback({message: "User does not exist"});
//         }
//     }
//     catch(dbError){
//         console.error("GET | dbError is: ", dbError.message);
//         errorCallback(dbError);
//     }
// };

User.signIn = async (userData, successCallback, errorCallback) => {
    try {
        // Find user by email
        const user = await User.findOne({ email: userData.email });
        
        if (!user) {
            return errorCallback({ 
                name: "AuthenticationError", 
                message: "Invalid email or password",
                status: 401 
            });
        }
        
        // Compare passwords
        const isMatch = await bcrypt.compare(userData.password, user.password);
        
        if (!isMatch) {
            return errorCallback({ 
                name: "AuthenticationError", 
                message: "Invalid email or password",
                status: 401 
            });
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { 
                email: user.email, 
                userId: user._id 
            }, 
            JWT_SECRET_KEY, 
            { expiresIn: '1h' }
        );
        
        successCallback({ 
            token, 
            user: { 
                email: user.email, 
                name: user.name, 
                stateIso2: user.stateIso2, 
                city: user.city 
            }
        });
    } catch (error) {
        errorCallback(error);
    }
};

User.addUser = async (user, successCallback, errorCallback) => {
    let encryptedPassword = "";
    if(user?.password){
        try{
            encryptedPassword = bcrypt.hashSync(user.password, 10);
        }
        catch(err){
            console.log("The encrypted password is: ", encryptedPassword);
        }
    }

    try{
        const dbRes = await User.insertMany([
            {...user, password: encryptedPassword},
        ]);
        console.log("POST | dbRes is: ", dbRes);
        successCallback(dbRes);
    }
    catch(dbError){
        console.error("POST | dbError is: ", dbError.message);
        errorCallback(dbError);
    }
}

export default User;