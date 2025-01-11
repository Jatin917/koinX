import mongoose from "mongoose"

export const Connection = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB Connected Successfully");
    } catch (error) {
        console.log("DB Connection error");
    }
}