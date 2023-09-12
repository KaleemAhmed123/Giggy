import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";

////////////
export const register = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) return res.status(403).send("User with this name already exist");

    const hash = bcrypt.hashSync(req.body.password, 7);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(201).send("User has been created");
    // console.log("User", newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

////////////
export const login = async (req, res) => {
  try {
    // usename is unique will search with that
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).send("User not exist with this name.");

    // compare the hashed passwords and check for equality
    if ((await bcrypt.compare(req.body.password, user.password)) === false)
      return res.status(400).send("Wrong password.");
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
          httponly: true,
        })
        .status(200)
        .send(restInfo);
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send(error.message);
  }
};

export const logout = async (req, res) => {};
