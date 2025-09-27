import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../Models/user.model.js";
import { sendEmail } from "../Utils/nodemailer.util.js";

export const checkAuthStatus = async (req, res, next) => {
  try {
    const { userId } = req;

    const currentUser = await User.findOne({ _id: userId });

    if (!currentUser) {
      return res.status(400).json({
        success: false,
        message: "user is not logged in"
      });
    }

    return res.status(200).json({
      success: true,
      message: "user is logged in "
    });
  } catch (err) {
    next(err);
  }
};

export const postRegister = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Bad request - nothing is being sent"
      });
    }

    const { fullName: name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const isUserExist = await User.findOne({ email }).select("_id");

    if (isUserExist) {
      return res.status(400).json({
        success: false,
        message: "user exist already, log in instead"
      });
    }

    const newUser = new User({
      name,
      email,
      role,
      password: hashedPassword, 
    });

    await newUser.save();

    const { SECRET_KEY } = process.env;
    if (!SECRET_KEY)
      throw new Error("SECRET_KEY is not defined in environment variables");

    const token = jwt.sign({ userId: newUser._id }, SECRET_KEY);

    res.cookie("token", token, {
      maxAge: 60 * 60 * 1000,
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
};

export const postLogin = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Bad request - nothing is being sent"
      });
    }

    const { email, password } = req.body;

    const currentUser = await User.findOne({ email }).select(
      "_id password email"
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

    const { SECRET_KEY } = process.env;
    if (!SECRET_KEY)
      throw new Error("SECRET_KEY is not defined in environment variables");

    const token = jwt.sign({ userId: currentUser?._id }, SECRET_KEY);

    res.cookie("token", token, {
      maxAge: 60 * 60 * 1000,
      httpOnly: true
    });

    return res.status(200).json({
      success: true,
      message: "user logged in successfully",
      data: currentUser
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "user logged out successfully"
    });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const currentUser = await User.findOne({ email });

    if (!currentUser) {
      return res.status(400).json({
        success: false,
        message: "user does not exist, sign up first"
      });
    }

    const { SECRET_KEY } = process.env;
    if (!SECRET_KEY)
      throw new Error("SECRET_KEY is not defined in environment variables");

    const token = jwt.sign({ email }, SECRET_KEY);

    const url = `http://localhost:5000/auth/reset-password/${token}`;

    await sendEmail({
      to: email,
      subject: "Password Reset Request",
      template: "forgotPassword",
      data: {
        url,
        name: currentUser.name
      }
    });

    return res.status(200).json({
      success: true,
      message: "email sent"
    });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    const { SECRET_KEY } = process.env;
    if (!SECRET_KEY)
      throw new Error("SECRET_KEY is not defined in environment variables");

    let { email } = jwt.verify(token, SECRET_KEY);
    const hashedPassword = await bcrypt.hash(password, 12);

    const updatedUser = await User.findOneAndUpdate(
      { email },
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
};
