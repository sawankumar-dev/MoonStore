import mongoose from "mongoose";
import config from "./config.js";

export async function connectToMongoDB() {
  try {
    await mongoose.connect(config.MONGO_URI, )
  } catch (err) {
    console.dir("MONGO_DB Error:");
    console.log(err)
    process.exit(1)
  }
}
