import express from "express";
import multer from "multer";
import { createPet } from "../controllers/PetController.js";

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

export default router;