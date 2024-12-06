import express from "express"
import UserModel from "../models/User.model.js"
import { verifyToken } from "../utils/helper.js";

const router = express.Router();

router.get("/:email", verifyToken, (req, res) => {
    console.log("fetch req received");
    UserModel.getUser(
        req,
        (dbRes) => {
            if(dbRes){
                if (!res.headersSent) {
                    res.status(200).json(dbRes);
                }
            }
            else{
                if (!res.headersSent) {
                    res.status(204).json(null);
                }
            }
        },
        (dbErr) => {
            console.log(dbErr.name);
            res.status(dbErr.status || 500);
            res.send({error: dbErr.message});
        }
    )
});

router.post("/login", (req, res) => {
    const userData = req.body;
    UserModel.signIn(
        userData,
        (dbRes) => {
            if(dbRes){
                res.send(dbRes);
            }
            else{
                res.status(400).send({message: "Invalid Credentials"});
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

    UserModel.addUser(
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