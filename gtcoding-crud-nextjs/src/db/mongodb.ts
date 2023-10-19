import { envs } from "@/configs/env";
import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(envs.db.mongo.uri)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log(error)
  }
}

export default connectMongoDB