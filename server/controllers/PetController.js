import PetModel from "../models/Pet.model.js";
import UserModel from "../models/User.model.js";

export const createPet = async(req, res) => {
    try{
        const{
            name, 
            breed,
            gender,
            age,
            description,
            stateIso2,
            city,
            currentUserEmail,
            image
        } = req.body;

        const user = await UserModel.findOne({email: currentUserEmail});
        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        const newPet = new PetModel({
            name, 
            breed,
            gender,
            age, 
            description,
            stateIso2,
            city,
            image,
            owner: user._id
        });

        await newPet.save();

        res.status(201).json({message: "Pet created successfully,", pet: newPet});
    }
    catch(error){
        res.status(500).json({message: "error creating pet, ", error});
    }
}