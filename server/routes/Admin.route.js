import express from "express";
import UserModel from "../models/User.model.js";
import PetModel from "../models/Pet.model.js"

const router = express.Router();

router.get("/auth/:email", async (req, res) => {
    const userEmail = req?.params?.email;
    console.log(userEmail);
    const user = await UserModel.findOne({email: userEmail});
    if(user === undefined || user === null){
        return res.status(404).send({isAdmin: 'User does not exist'});
    }
    if(!user.isAdmin){
        return res.status(403).send({isAdmin: false});
    }
    res.status(200).send({isAdmin: true});
});

router.get("/pets", async (req, res) => {
    try{
        const unnaprovedPets = await PetModel.find({approved: false});
        res.status(200).json(unnaprovedPets);
    }
    catch(err){
        console.log("Internal Server Error: ,", err);
        res.status(500).json({error: 'Internal Server Error!'});
    }
});

router.post("/pets/approve/:id", async (req, res) => {
    console.log('Approve Request Received');
    const id = req?.params?.id;
    try{
        const pet = await PetModel.findByIdAndUpdate(id, 
            {approved: true}, 
            {new: true}
        )
        console.log("update successful");
        res.status(200).send({message: "Updated Successfully"});
    }   
    catch(err){
        res.status(500).json({error: "Internal Server Error"});
    }
});

router.post("/pets/reject/:id", async (req, res) => {
    console.log('Reject Request Received');
    const id = req?.params?.id;
    try{
        const deletedPet = await PetModel.findByIdAndDelete(id);
        if(deletedPet){
            res.status(200).send({message: "Pet removed successfully"});
        }
        else{
            res.status(404).send({message: "Pet not found"});
        }
    }
    catch(err){
        res.status(500).send({message: "Internal Server Error"});
    }
})


export default router;