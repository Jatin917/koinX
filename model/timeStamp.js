import mongoose from "mongoose";

const timeStamp = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    lastExcution:{
        type:Date,
        required:true
    }
});

export const timeStampSchema = mongoose.model("timeStampSchema", timeStamp);