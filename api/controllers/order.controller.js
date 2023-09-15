import Gig from "../models/gig.model.js";
import createError from "../utils/error.js";
import Order from "../models/order.model.js";
import Stripe from "stripe";

// after intent we'll create order
export const intent = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_KEY);

  const gig = await Gig.findById(req.params.gigId);

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    // amount: req.body.price,
    amount: gig.price * 10,
    currency: "inr",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const newOrder = new Order({
    gigId: gig._id,
    img: gig.cover,
    title: gig.title,
    buyerId: req.userId, // the user is buyer
    sellerId: gig.userId, // whose gig (every gig we gave userId: by which user)
    price: gig.price,
    // payment_intent: "RandomNow",
    payment_intent: paymentIntent.id,
  });

  await newOrder.save();
  /// will send stripe id
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
};

// export const createOrder = async (req, res, next) => {
//   try {
//     // we'll take almost evrything from gig itself not from user
//     const gig = await Gig.findById(req.params.gigId);
//     if (!gig) return next(createError(403, "No gig found."));

//   } catch (error) {
//     next(error);
//   }
// };

// HAS SOME ISSUE
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });

    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
};

export const confirm = async (req, res, next) => {};
