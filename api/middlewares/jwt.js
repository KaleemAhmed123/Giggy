import jwt from "jsonwebtoken";
import createError from "../utils/error.js";

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return next(createError(403, "Token is not valid!"));

    // adding props using middleware in req obj
    req.userId = payload.id;
    req.isSeller = payload.isSeller;

    // 1 hr debug really imp
    next();
  });
};

export default verifyToken;
