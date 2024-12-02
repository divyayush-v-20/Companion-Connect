import express from "express"
import User from "../models/User.model.js"

const router = express.Router();

router.get("/details", async (req, res) => {
    try {
        // Extract token from Authorization header
        const token = req.headers.authorization.split(' ')[1];
        
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        
        // Find user by email from the token, excluding password
        const user = await User.findOne({ email: decoded.email }).select('-password');
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        res.json(user);
    } catch (error) {
        res.status(401).json({ error: "Unauthorized" });
    }
});

router.post("/login", (req, res) => {
    const userData = req.body;
    User.signIn(
        userData,
        (dbRes) => {
            if(dbRes){
                res.send(dbRes);
            }
            else{
                res.send(400);
                res.send(dbRes);
            }
        },
        (dbError) => {
            console.log(dbError.name);
            if(dbError.name == "ValidationError"){
                res.status(dbError.status || 400);
            }
            else{
                res.status(dbError.status || 500);
            }
            res.send({error: dbError.message});
        }
    );
});

router.post("/", (req, res) => {
    // res.json(req.body);
    console.log(req.body);
    const user = req.body;

    User.addUser(
        user, 
        (dbRes) => {
            if(dbRes){
                res.send(dbRes);
            }
            else{
                res.status(400);
                res.send(dbRes);
            }
        },
        (dbError) => {
            console.log(dbError.name);
            if(dbError.name === "ValidationError"){
                res.status(400); //client side error
            }
            else{
                res.status(500); //server side error
            }
            res.send({error: dbError.message});
        }
    );
});

export default router;