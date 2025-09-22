import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from ".bin/Models/user.model.js";
import transporter from "../Utils/nodemailer.util.js";
import { NextFunction, Request, Response } from "express";
import { JWTRequest } from "../Middleware/auth.middleware.js";


export const checkAuthStatus = async (req: JWTRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = req;

    const currentUser = await User.findOne({ _id: userId })

    if (!currentUser) {
      return res.status(400).json({
        success: false,
        message: "user is not logged in",
      })
    }

    return res.status(200).json({
      success: true,
      message: "user is logged in "
    })


  } catch (err) {
    next(err)
  }
}

export const postRegister = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        success: false,
        message: "Bad request - nothing is being sent"
      });
    }

    const { fullName: name, email: emailAddress, password } = req.body;

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

    const { SECRET_KEY } = process.env;
    if (SECRET_KEY) throw new Error("SECRET_KEY is not defined in environment variables")

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

export const postLogin = async (req: Request, res: Response, next: NextFunction) => {
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

    const { SECRET_KEY } = process.env;
    if (SECRET_KEY) throw new Error("SECRET_KEY is not defined in environment variables")

    const token = jwt.sign({ userId: currentUser?._id }, SECRET_KEY);

    res.cookie("token", token, {
      maxAge: 60 * 60 * 1000,
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
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
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
    const { emailAddress } = req.body;
    const currentUser = await User.findOneA({ emailAddress });

    if (!currentUser) {
      return res.status(400).json({
        success: false,
        message: "user does not exist, sign up first"
      });
    }


    const { SECRET_KEY } = process.env;
    if (SECRET_KEY) throw new Error("SECRET_KEY is not defined in environment variables")

    const token = jwt.sign({ emailAddress }, SECRET_KEY);

return res.status(200).json({
  success: true,
  message: "password reset token created successfully",
  data: {token}
})
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
};



export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const { SECRET_KEY } = process.env;
    if (SECRET_KEY) throw new Error("SECRET_KEY is not defined in environment variables")

      const { password, token } = req.body;

    let { emailAddress } = jwt.verify(token, SECRET_KEY) as { emailAddress: string };
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
}