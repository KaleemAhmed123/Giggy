import createError from "../utils/error.js";
import Conversation from "../models/conversation.model.js";

// when first time user clicks icon (have conv)
export const createConversation = async (req, res, next) => {
  // our conversation id will be (sellerId + buyerId) first seller then buyer (ourRule)
  // will pass to from body
  const sellerPlusBuyerID = req.isSeller
    ? req.userId + req.body.to
    : req.body.to + req.userId;

  const newConversation = new Conversation({
    roomId: sellerPlusBuyerID,
    // seller id token se mil jaegi warna body se buyer id aegai "to"
    sellerId: req.isSeller ? userId : req.body.to,
    buyerId: req.isSeller ? req.body.to : req.userId,
    readBySeller: req.isSeller,
    readByBuyer: !req.isSeller,
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(201).send(savedConversation);
  } catch (error) {
    next(error);
  }
};

// for updating readBySeller and readByBuyer info
// if we are buyer then bydef readByBuyer will be true and seller false and in seller viceversa
export const updateConversation = async (req, res, next) => {
  try {
    const updatedConversation = await Conversation.findOneAndUpdate(
      // room id (sellerID + buyerID)
      { roomId: req.params.id },
      {
        $set: {
          readBySeller: req.isSeller,
          readByBuyer: !req.isSeller,
        },
      },
      // import to get new else it will give old results
      { new: true }
    );

    res.status(200).send(updateConversation);
  } catch (error) {
    next(error);
  }
};

export const getSingleConversation = async (req, res) => {
  try {
    const conversation = Conversation.findOne({ roomId: req.params.id });
    res.status(200).send(conversation);
  } catch (error) {
    next(error);
  }
};

// for all chat messages for a user (seller or buyer)
export const getConversations = async (req, res) => {
  try {
    // this is how we pass conditional prop in mongoose (req.isSeller ? {sellerId: req.userId}: {buyerId: req.userId})
    const conversations = Conversation.find(
      req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }
    );
    res.status(200).send(conversations);
  } catch (error) {
    next(error);
  }
};
