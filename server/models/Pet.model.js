import mongoose from "mongoose";
import UserModel from "./User.model.js";

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    }, 
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    image: {
        type: String,
        required: true
    },
    stateIso2: {
        type: String, 
        required: true
    },
    city: {
        type: String, 
        required: true
    }
    ,
    approved: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true
    },
}, {timestamps: true});

const PetModel = mongoose.model("PetModel", petSchema);

PetModel.addPet = async(req, successCallback, errorCallback) => {
    let owner_id;
    try{
        const owner = UserModel.getUser(
            req.currentUserEmail,
            (dbRes) => {
                owner_id = dbRes._id
            }
        )
        const dbRes = await PetModel.insertMany([req, {owner: owner_id}]);
        successCallback(dbRes);
    }
    catch(dbErr){
        console.error("POST | dbErr: ", dbErr.message);
    }
}

export default PetModel;