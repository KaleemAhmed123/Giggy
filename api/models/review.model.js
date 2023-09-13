import mongoose, { Schema } from "mongoose";

// which GIG, which USER, actual COMMENT, given STAR
const reviewSchema = new Schema(
  {
    gigId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    star: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
