import express from "express";
import {
  createGig,
  deleteGig,
  getGig,
  getGigs,
} from "../controllers/gig.controller.js";

import verifyToken from "../middlewares/jwt.js";

const router = express.Router();

// for all gigS
router.get("/", getGigs);
// user must be logged in so verifyToken
router.post("/", verifyToken, createGig);
// check gigId with tokenId if match allow
router.delete("/:id", verifyToken, deleteGig);
//
router.get("/single/:id", getGig);

export default router;
