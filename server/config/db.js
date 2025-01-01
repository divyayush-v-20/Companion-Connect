import mongoose from "mongoose";
const mongodb_uri = process.env.MONGO_URI || "mongodb+srv://divyayushv20:dv123@dev-cluster-0.os4jo.mongodb.net/projectdb";

export  async function connectDB(){
    try{
        await mongoose.connect(`${mongodb_uri}`);
        console.log(`CONNECTED TO DB`);
    }
    catch(error){
        console.log('Could not connect to server due to error: ', error);
    }
}