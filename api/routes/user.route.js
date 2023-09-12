import express from "express";
import { deleteUser, getUser } from "../controllers/user.controller.js";
import verifyToken from "../middlewares/jwt.js";
const router = express.Router();

// so before delteUser midddlware verifyToken will run
// if verified it will ad two props name userId, isSeller (payload by server)
// with this payload(userId) we can verify user's authenticity
router.delete("/:id", verifyToken, deleteUser);
router.get("/:id", getUser);

export default router;
