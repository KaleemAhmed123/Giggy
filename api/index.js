import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

// ROUTES
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import reviewRoute from "./routes/review.route.js";
import orderRoute from "./routes/order.route.js";
import messageRoute from "./routes/message.route.js";
import conversationRoute from "./routes/conversation.route.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.use("/api/messages", messageRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/reviews", reviewRoute);

///////////////////////////////////
const port = 8800;
app.listen(port, () => {
  connect();
  console.log(`Server running at ${port}`);
});
