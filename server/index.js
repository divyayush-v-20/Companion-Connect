import express from "express";
import * as dotenv from "dotenv";
import {connectDB} from "./config/db.js"
import cors from "cors";
import userRoute from "./routes/user.js"
import petRoute from "./routes/pet.js"

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send(`Server running at http://localhost:${port}`)
});

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});

app.use("/user", userRoute);
app.use("/pets", petRoute);

connectDB();