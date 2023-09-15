import express from "express";
import verifyToken from "../middlewares/jwt.js";
import {
  getOrders,
  createOrder,
  intent,
} from "../controllers/order.controller.js";

const router = express.Router();

// router.post("/:gigId", verifyToken, createOrder);
//
router.get("/", verifyToken, getOrders);
// id for getting price from db not from body
router.post("/create-payment-intent/:gigId", verifyToken, intent);

export default router;
