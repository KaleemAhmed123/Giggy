import express from "express";
import {
  createConversation,
  getConversations,
  getSingleConversation,
  updateConversation,
} from "../controllers/conversation.controller.js";

const router = express.Router();

router.get("/", getConversations);
router.post("/", createConversation);
router.get("/single/:id", getSingleConversation);
router.put("/:id", updateConversation);

export default router;
