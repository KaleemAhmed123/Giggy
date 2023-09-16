// import Gig from "../models/gig.model.js";
// import createError from "../utils/error.js";
// import Order from "../models/order.model.js";
// import Stripe from "stripe";

// export const intent = async (req, res, next) => {
//   try {
//     const stripe = new Stripe(process.env.STRIPE_KEY);

//     // Retrieve the gig based on the provided ID
//     const gig = await Gig.findById(req.params.id);

//     if (!gig) {
//       // Handle the case where the gig is not found
//       return next(createError(404, "Gig not found"));
//     }

//     // Create a PaymentIntent with the order amount and currency
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: gig.price * 100, // Convert to the required currency subunit (e.g., cents)
//       currency: "inr",
//       // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
//       automatic_payment_methods: {
//         enabled: true,
//       },
//     });

//     // Create a new order using data from the gig and paymentIntent
//     const newOrder = new Order({
//       gigId: gig._id,
//       img: gig.cover,
//       title: gig.title,
//       buyerId: req.userId, // the user is a buyer
//       sellerId: gig.userId, // whose gig (every gig we gave userId: by which user)
//       price: gig.price,
//       payment_intent: paymentIntent.id,
//     });

//     await newOrder.save();

//     // Send the clientSecret back to the client for payment confirmation
//     res.status(201).send({
//       clientSecret: paymentIntent.client_secret, // Corrected property name
//     });
//   } catch (error) {
//     console.error("Error in intent route:", error);
//     next(error);
//   }
// };

import Gig from "../models/gig.model.js";
import createError from "../utils/error.js";
import Order from "../models/order.model.js";
import Stripe from "stripe";

export const intent = async (req, res, next) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_KEY);

    // Retrieve the gig based on the provided ID
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      // Handle the case where the gig is not found
      return next(createError(404, "Gig not found"));
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: gig.price * 100, // Convert to the required currency subunit (e.g., cents)
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Create a new order using data from the gig and paymentIntent
    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: paymentIntent.id,
    });

    await newOrder.save();

    // Send the clientSecret back to the client for payment confirmation
    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error in intent route:", error);
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
  } catch (err) {
    console.error("Error in getOrders route:", err);
    next(err);
  }
};

// after getting payment intent we mark the completed as true
export const confirm = async (req, res, next) => {
  try {
    const order = await Order.findOneAndUpdate(
      {
        payment_intent: req.params.payment_intent,
      },
      {
        $set: {
          isCompleted: true,
        },
      }
    );

    if (!order) {
      return next(createError(404, "Order not found"));
    }

    res.status(200).send("Order confirmed.");
  } catch (error) {
    next(error);
  }
};
