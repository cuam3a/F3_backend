import mongoose from 'mongoose'
import { initConfig } from '../utils/init';
require("dotenv").config();

export const connectDB = () => {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(process.env.MONGO_DB || '').then(() => { initConfig() });
        console.log("Mongo Connected")
    } catch (error) {
        console.log("Mongo Connected Error:" + error)
    }
}
