import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/constants.js";

const verifyToken = async (req, res, next) => {
    const authToken = req.get("Authorization");
    let decodedAuthToken;
    try{
        decodedAuthToken = jwt.verify(authToken, JWT_SECRET_KEY);
        req.emailFromAuthToken = decodedAuthToken.email;
        next();
    }
    catch(err){
        res.status(401).send({message: "Invalid Credentials"});
    }
    console.log("DecodedAuthToken is: ", decodedAuthToken);
}

export {verifyToken};