import express from "express";
import { createPet } from "../controllers/PetController.js";
import PetModel from "../models/Pet.model.js";
import UserModel from "../models/User.model.js"
// import {upload} from "../config/cloudinary.js";  

const router = express.Router();

// const upload = multer({storage});

router.post("/upload-pet", createPet);
// router.post("/upload-pet", upload.single("image"), createPet);

router.get("/:city", async (req, res) => {
    const city = req?.params?.city;
    console.log(`Get Pet from specific ${city} request received`);
    try{
      const searchPet = await PetModel.find({city: city, approved: true});
      if(searchPet){
        res.status(200).send(searchPet);
      }
      else{
        res.status(404).send({message: "No Available Pets"});
      }
    }
    catch(error){
      res.status(500).send({message: "Internal Server Error"});
    }
    
});

router.get("/owner/:id", async (req, res) => {
    const id = req?.params?.id;
    try{
      const searchOwner = await UserModel.findById(id);
      if(searchOwner){
        res.status(200).send(searchOwner);
      }
      else{
        res.status(404).send({message: "User does not exist"});
      }
    }
    catch(error){
      res.status(500).send({message: "Internal Server Error"});
    }
})


export default router;
