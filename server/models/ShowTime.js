import mongoose from "mongoose";

const showTimeSchema= new mongoose.Schema({});



const ShowTime= mongoose.model("ShowTime",showTimeSchema);

export default ShowTime;