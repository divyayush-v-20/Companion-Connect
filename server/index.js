import express from "express";
import * as dotenv from "dotenv";
import {connectDB} from "./config/db.js"
import cors from "cors";
import userRoute from "./routes/User.route.js"
import path from "path"
import petRoute from "./routes/Pet.route.js"
import adminRoute from "./routes/Admin.route.js"
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));
// images from client side can be accessed by fetching
// http://localhost:8000/uploads/<filename>

app.get("/", (req, res) => {
    res.send(`Server running at http://localhost:${port}`)
});

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});

app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/pet", petRoute);

connectDB();