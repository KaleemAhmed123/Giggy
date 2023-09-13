import gigModel from "../models/gig.model.js";
import Gig from "../models/gig.model.js";
import createError from "../utils/error.js";

export const createGig = async (req, res, next) => {
  // verifyToken add payload (id, isSeller in req obj)
  if (!req.isSeller) return next(createError(403, "Only sellers can add gig."));

  const newGig = new Gig({
    ...req.body,
    userId: req.userId, // from jwt
  });

  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (error) {
    next(error);
  }
};

export const deleteGig = async (req, res, next) => {
  // first find the userId of gig if its equal to my id cookie allowes
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) next(createError(404, "No gig with this ID."));
    // req.userId added by verifyToken middleware
    if (gig.userId !== req.userId)
      return next(createError(403, "You can delete only your gig.")); //only owner can delete a gig

    await Gig.findByIdAndDelete(req.params.id);

    res.status(200).send("Gig has been deleted.");
  } catch (error) {
    next(error);
  }
};

export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) next(createError(404, "Gig not found."));

    res.status(200).send(gig);
  } catch (error) {
    next(error);
  }
};

export const getGigs = async (req, res, next) => {
  // filters: min-max price, category, newest/oldest
  // CRITICAL ----------
  const allQuery = req.query;
  const filters = {
    ...(allQuery.userId && { userId: allQuery.userId }),
    ...(allQuery.cat && { cat: allQuery.cat }),
    ...(allQuery.search && {
      title: { $regex: allQuery.search, $options: "i" },
    }),
    ...((allQuery.min || allQuery.max) && {
      price: {
        ...(allQuery.min && { $gte: allQuery.min }),
        ...(allQuery.max && { $lte: allQuery.max }),
      },
    }),
  };
  try {
    const gigs = await Gig.find(filters).sort({ [allQuery.sort]: -1 });
    if (!gigs) next(createError(404, "Gigs not found."));

    res.status(200).send(gigs);
  } catch (error) {
    next(error);
  }
};
