import Review from "../models/review.model.js";
import Gig from "../models/gig.model.js";
import createError from "../utils/error.js";

// both gigId and userId needed
export const createReview = async (req, res, next) => {
  if (req.isSeller) next(createError(403, "Sellers cant create review."));
  const newReview = new Review({
    // added by verifyToken
    userId: req.userId,
    gigId: req.body.gigId,
    desc: req.body.desc,
    start: req.body.start,
  });

  try {
    // if already posted review dont allow (need bith IDS)
    const review = await Review.find({
      userId: req.userId,
      gigId: req.body.gigId,
    });
    if (review)
      return next(createError(403, "You have already created review."));

    const savedReview = await newReview.save();

    // since giving review so update stars in gigModel
    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });

    res.status(201).send(savedReview);
  } catch (error) {
    next(error);
  }
};

// every gigID has review if userID person
export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.body.gigId });
    res.status(200).send(reviews);
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
