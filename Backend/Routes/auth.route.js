import { Router } from "express";
const router = Router();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../Models/user.model.js";
import transporter from "../Utils/nodemailer.util.js";

router.post("/register", async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Bad request - nothing is being sent"
      });
    }

    const { name, emailAddress, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const isUserExist = await User.findOne({ emailAddress }).select("_id");

    if (isUserExist) {
      return res.status(400).json({
        success: false,
        message: "user exist already, log in instead"
      });
    }
    const newUser = new User({
      name,
      emailAddress,
      password: hashedPassword
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY);

    res.cookie("token", token, {
      maxAge: 360000,
      httpOnly: true
    });

    return res.status(201).json({
      success: true,
      message: "user registered successfully",
      data: newUser
    });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Bad request - nothing is being sent"
      });
    }

    const { emailAddress, password } = req.body;

    const currentUser = await User.findOne({ emailAddress }).select(
      "_id password emailAddress"
    );

    if (!currentUser) {
      return res.status(401).json({
        success: false,
        message: "user does not exist, sign up instead"
      });
    }

    const isCorrectPassword = await bcrypt.compare(
      password,
      currentUser.password
    );

    if (!isCorrectPassword) {
      return res.status(401).json({
        success: false,
        message: "incorrect credentials, try again later"
      });
    }

    const token = jwt.sign({ userId: currentUser._id }, process.env.SECRET_KEY);

    res.cookie("token", token, {
      maxAge: 360000,
      httpOnly: true
    });

    return res.status(201).json({
      success: true,
      message: "user logged in successfully",
      data: currentUser
    });
  } catch (err) {
    next(err);
  }
});

router.all("/logout", async (req, res, next) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "user logged out successfully"
    });
  } catch (err) {
    next(err);
  }
});

router.post("/reset-password/:token", async (req, res, next) => {
  try {
    const { token } = req.params;

    let { emailAddress } = jwt.verify(token, process.env.SECRET_KEY);
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    const updatedUser = await User.findOneAndUpdate(
      { emailAddress },
      {
        $set: { password: hashedPassword }
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "password reset successfully",
      data: updatedUser
    });
  } catch (err) {
    next(err);
  }
});

router.post("/reset-password", async (req, res, next) => {
  try {
    const { emailAddress } = req.body;
    const currentUser = await User.findOne({ emailAddress });

    if (!currentUser) {
      return res.status(400).json({
        success: false,
        message: "user does not exist, sign up first"
      });
    }

    const token = jwt.sign({ emailAddress }, process.env.SECRET_KEY);

    const url = `http://localhost:5000/auth/reset-password/${token}`;

    console.log(url)

    // transporter.sendMail({
    //   from: "simplysaad <saadidris23@gmail.com>",
    //   to: emailAddress,
    //   subject: "Request to Reset Password",
    //   html: `<p>
    //   This is to inform you that a request was made to reset your password. ignore if this was not you, otherwise click the link below to proceed
    //     <a href='${url}' class='background-color=green; display: block; padding: 10px 16px;'> reset password </a>
    //   </p>`
    // });
  } catch (err) {
    next(err);
  }
});

export default router  
