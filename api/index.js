import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// ROUTES
import userRoute from "./routes/user.route.js";

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

app.use("/api/user", userRoute);
const port = 8800;
app.listen(port, () => {
  connect();
  console.log(`Server running at ${port}`);
});
