import express from "express";
import {
  createConversation,
  getConversations,
  getSingleConversation,
  updateConversation,
} from "../controllers/conversation.controller.js";
import verifyToken from "../middlewares/jwt.js";

const router = express.Router();

// if its first time (no chats aon) then we create new conv
router.post("/", verifyToken, createConversation);
// if already had conv then fetch prev and continue updateConv
router.get("/", verifyToken, getConversations);
router.get("/single/:roomId", verifyToken, getSingleConversation);
router.put("/:roomId", verifyToken, updateConversation);

export default router;
