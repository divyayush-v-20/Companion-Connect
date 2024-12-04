import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: true
    }, 
    age: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true
    }
}, {timestamps: true});

const PetModel = mongoose.model("PetModel", petSchema);