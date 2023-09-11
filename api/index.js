import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};

app.listen(8800, () => {
  connect();
  console.log("Backend server is running!");
});
