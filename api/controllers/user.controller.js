import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("You are not logged in.");

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (payload.id !== user._id.toString())
      return res.status(403).send("You can delete only your account.");
  });

  // user can delete own only
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("Account deleted successfully.");
};

export const getUser = async (req, res, next) => {};
