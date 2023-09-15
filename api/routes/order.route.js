import express from "express";
import verifyToken from "../middlewares/jwt.js";
import { getOrders, intent, confirm } from "../controllers/order.controller.js";

const router = express.Router();

// router.post("/:gigId", verifyToken, createOrder);
//
router.get("/", verifyToken, getOrders);
// id for getting price from db not from body
router.post("/create-payment-intent/:id", verifyToken, intent);
//
router.put("/", verifyToken, confirm);

export default router;
