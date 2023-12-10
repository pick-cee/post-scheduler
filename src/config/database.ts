import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const uri = process.env.NODE_ENV === "development"
    ? `${process.env.MONGODB_URI}`
    : `${process.env.MONGODB_URI_CLOUD}`


const connectDB = async () => {
    await mongoose.connect(uri)
        .then(() => { console.log("DB connected successfully!"), { useNewUrlParser: true, useUnifiedTopology: true } })
        .catch(err => { console.log(err) })
}

export default connectDB