import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let foodData = []; // Initialize empty arrays to store fetched data
let foodCategory = [];

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    const fetched_foodData = mongoose.connection.db.collection("foodData");
    const fetched_foodCategory =
      mongoose.connection.db.collection("foodCategory");

    // Fetching data and storing it in global variables
    foodData = await fetched_foodData.find({}).toArray();
    // console.log(foodData);
    foodCategory = await fetched_foodCategory.find({}).toArray();
    // console.log(foodCategory);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export { mongoose, connectToMongoDB, foodData, foodCategory };
