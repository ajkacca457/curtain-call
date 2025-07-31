import mongoose from "mongoose";


const ConnectDB= async()=> {
    try {
        mongoose.connection.on("connected", ()=> {
            console.log("connected to database");
        })
        await mongoose.connect(process.env.MONGO_URI)
    } catch (error) {   
        console.log(error.message);
    }

};

export default ConnectDB;