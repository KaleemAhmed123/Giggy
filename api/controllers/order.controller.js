import Gig from "../models/gig.model.js";
import createError from "../utils/error.js";
import Order from "../models/order.model.js";

export const intent = async (req, res, next) => {};

export const createOrder = async (req, res, next) => {
  try {
    // we'll take almost evrything from gig itself not from user
    const gig = await Gig.findById(req.params.gigId);

    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: "RandomNow",
    });

    await newOrder.save();
    /// will send stripe id
    res.status(201).send("successfull");
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });

    res.status(200).send(orders);
    ////////////////////////
  } catch (error) {
    next(error);
  }
};

export const confirm = async (req, res, next) => {};
