import mongoose from "mongoose";

const showTimeSchema= new mongoose.Schema({
    show: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Show" },
    showDateTime: {type:Date, required:true},
    showPrice : {type:Object, default:{}},
    occupiedSeats: {type:Object, default: {}}
}, {
    minimize:false
});



const ShowTime= mongoose.model("ShowTime",showTimeSchema);

export default ShowTime;