import express from "express";
import * as dotenv from "dotenv";
import {connectDB} from "./config/db.js"
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());

app.get("/", (req, res) => {
    res.send(`Server running at http://localhost:${port}`)
});

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});

connectDB();