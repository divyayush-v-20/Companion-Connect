import express from "express"
import {User} from "../models/User.model.js"

const router = express.Router();

router.post("/", (req, res) => {
    res.json(req.body);
    console.log(req.body);
});

export default router;