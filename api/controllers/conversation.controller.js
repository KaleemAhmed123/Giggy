import createError from "../utils/error.js";
import Conversation from "../models/conversation.model.js";

// when first time user clicks icon (have conv)
// our conversation id will be (sellerId + buyerId) first seller then buyer (ourRule)
// will pass to from body
export const createConversation = async (req, res, next) => {
  const newConversation = new Conversation({
    // seller id token se mil jaegi warna body se buyer id aegai "to"
    roomId: req.isSeller ? req.userId + req.body.to : req.body.to + req.userId,
    sellerId: req.isSeller ? req.userId : req.body.to,
    buyerId: req.isSeller ? req.body.to : req.userId,
    readBySeller: req.isSeller,
    readByBuyer: !req.isSeller,
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(201).send(savedConversation);
  } catch (err) {
    next(err);
  }
};

// for updating readBySeller and readByBuyer info
// if we are buyer then bydef readByBuyer will be true and seller false and in seller viceversa
// Update Conversation
export const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          ...(req.isSeller ? { readBySeller: true } : { readByBuyer: true }),
        },
      },
      { new: true }
    );

    res.status(200).send(updatedConversation);
  } catch (err) {
    next(err);
  }
};

// room id (sellerID + buyerID)
// one is already T and when clicked mark as read we make both true
// important to get new else it will give old results

export const getSingleConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ id: req.params.id });
    if (!conversation) return next(createError(404, "Not found!"));
    res.status(200).send(conversation);
  } catch (err) {
    next(err);
  }
};
// for all chat messages for a user (seller or buyer)
// this is how we pass conditional prop in mongoose (req.isSeller ? {sellerId: req.userId}: {buyerId: req.userId})

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find(
      req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
    ).sort({ updatedAt: -1 });
    res.status(200).send(conversations);
  } catch (err) {
    next(err);
  }
};
