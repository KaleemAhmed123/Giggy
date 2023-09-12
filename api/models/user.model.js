import mongoose, { Schema } from "mongoose";

// all fields at signup form (that switch decides seller or buyer)
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    phone: {
      type: String,
    },
    desc: {
      type: String,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
