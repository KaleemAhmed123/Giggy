import mongoose, { Schema } from "mongoose";

const conversationSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    sellerId: {
      type: String,
      required: true,
    },
    buyerId: {
      type: String,
      required: true,
    },
    // lama has set this false
    readBySeller: {
      type: Boolean,
      required: false,
    },
    readByBuyer: {
      type: Boolean,
      required: false,
    },
    lastMessage: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Conversation", conversationSchema);
