import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/constants";

const verifyToken = (req, res, next) => {
    const authToken = req.get("Authorization");
    let decodedAuthToken;
    try{
        decodedAuthToken = jwt.verify(authToken, JWT_SECRET_KEY);
        req.emailFromAuthToken = decodedAuthToken
    }
    catch(err){
        res.status(401).send({ message: "Invalid credentials" });
    }
    console.log("The decodedAuthToken is: ", decodedAuthToken);
}

export {verifyToken};