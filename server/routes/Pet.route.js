import express from "express";
import multer from "multer";
import { createPet } from "../controllers/PetController.js";
import PetModel from "../models/Pet.model.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

const upload = multer({storage});

router.post("/upload-pet", upload.single("image"), createPet);


router.get("/:city", async (req, res) => {
    const city = req?.params?.city;
    console.log(`Get Pet from specific ${city} request received`);
    try{
      const searchPet = await PetModel.find({city: city});
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


export default router;