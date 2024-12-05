import express from "express";
import PetModel from "../models/Pet.model.js";
import UserModel from "../models/User.model.js"

const router = express.Router();

router.post("/", (req, res) => {
    const petData = req.body;
    petData.image = "testing"

    PetModel.addPet(
        petData,
        (dbRes) => {
            if(dbRes){
                res.send(dbRes);
            }
            else{
                res.status(400);
                res.send(dbRes);
            }
        },
        (dbErr) => {
            console.log(dbErr.name);
            res.send({error: dbErr.message});
        }
    )
});

export default router;