import mongoose from "mongoose";
const mongodb_uri = "mongodb+srv://divyayushv20:dv123@dev-cluster-0.os4jo.mongodb.net/myapp_dev";

export  async function connectDB(){
    try{
        await mongoose.connect(`${mongodb_uri}`);
        console.log(`Connected to URI : ${mongodb_uri}`);
    }
    catch(error){
        console.log('Could not connect to server due to error: ', error);
    }
}