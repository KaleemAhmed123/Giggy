import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import createError from "../utils/error.js";

////////////
export const register = async (req, res, next) => {
  try {
    // TODO (may cause problem)
    const user = await User.findOne({ username: req.body.username });
    if (user)
      return next(createError(403, "User with this name already exist"));

    const hash = bcrypt.hashSync(req.body.password, 7);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(201).send("User has been created.");
    // console.log("User", newUser);
  } catch (error) {
    // console.log(error);
    // res.status(500).send(error.message);
    return next(error);
  }
};

////////////
export const login = async (req, res, next) => {
  try {
    // usename is unique will search with that
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      return next(createError(404, "User not exist with this name."));

    // compare the hashed passwords and check for equality
    if ((await bcrypt.compare(req.body.password, user.password)) === false)
      return next(createError(400, "Wrong password."));
    // we generate a token and in each subsequent req we use verifyToken utility
    else {
      const token = Jwt.sign(
        {
          id: user._id,
          isSeller: user.isSeller,
        },
        process.env.JWT_KEY
      );

      const { password, ...restInfo } = user._doc;
      return res
        .cookie("accessToken", token, {
          httpOnly: true,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .send(restInfo);
    }
  } catch (error) {
    // console.log(error);
    // res.status(500).send(error.message);
    next(error); // error obj at runtime
  }
};

export const logout = async (req, res) => {
  // scope: will use redis caching in future

  // (deleting the accesToken)
  res
    .clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .send("User logged out successfully.");
};
