import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, require: [true, "please add a name"], maxLength: [50, "name cant be more than 50 characters"] },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/, 'Please fill a valid email address']
    },
    image: {type:String, required:true}
})

const User= mongoose.model("User",userSchema);

export default User;