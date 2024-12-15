import express from "express";
import UserModel from "../models/User.model.js";
import { verifyToken } from "../utils/helper.js";

const router = express.Router();

router.get("/auth/:email", async (req, res) => {
    const userEmail = req?.params?.email;
    console.log(userEmail);
    const user = await UserModel.findOne({email: userEmail});
    // console.log(user.isAdmin);
    if(user === undefined || user === null){
        return res.status(404).send("User does not exist");
    }
    if(!user.isAdmin){
        return res.status(403).send({isAdmin: false});
    }
    res.status(200).send({isAdmin: true});
    // res.send("hello");
});


export default router;