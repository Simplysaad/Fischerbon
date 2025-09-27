import { initialize, verify } from "../Utils/paystack.util.js";

import Payment from "../Models/payment.model.js";
import Enrollment from "../Models/enrollment.model.js";
import Course from "../Models/course.model.js";
import { sendEmail } from "../Utils/nodemailer.util.js";
import format from "../Utils/format.util.js";

export const createEnrollment = async (req, res, next) => {
  try {
    // check if logged in
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - user not logged in"
      });
    }

    const { courseId } = req.params;

    const currentUser = req.user;
    const { email } = currentUser;

    const currentCourse = await Course.findOne({ _id: courseId }).select(
      "_id price title"
    );

    if (!currentCourse) {
      return res.status(400).json({
        success: false,
        message: "invalid course id"
      });
    }

    const { price: amount } = currentCourse;

    const amountInKobo = amount * 100;

    const payment = await initialize(email, amountInKobo, courseId);

    // const {reference, authorization_url, access_code} = payment

    return res.status(201).json({
      success: true,
      message: "payment initialized",
      data: payment
    });
  } catch (err) {
    next(err);
  }
};

export const verifyEnrollment = async (req, res, next) => {
  try {
    const { reference } = req.query;
    const { courseId } = req.params;
    if (!reference) throw new Error("no reference token");

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - user not logged in "
      });
    }

    const currentUser = req.user;

    const payment = await verify(reference);

    if (!payment) {
      return res.status(400).json({
        success: false,
        message: "Bad request - invalid payment reference "
      });
    }

    if (!payment.status || payment.data?.status !== "success") {
      return res.status(400).json({
        success: false,
        message: payment.message || "payment not completed"
      });
    }

    const newPayment = await Payment.create({
      ...payment.data,
      transactionId: payment.data?.id,
      userId: currentUser?._id
    });

    const currentCourse = await Course.findById(courseId).select(
      "_id title price"
    );

    const newEnrollment = await Enrollment.create({
      courseId,
      userId: currentUser._id,
      payment: newPayment?._id
    });

    const date = new Date(payment.data?.createdAt || newPayment.createdAt);

    await sendEmail({
      to: currentUser.email,
      subject: "Course Enrollment Confirmation",
      template: "enrollmentSuccess",
      data: {
        name: currentUser.name.split(" ")[0] || "User",
        title: currentCourse.title,
        amount: payment.data.amount / 100,
        date: format(date)
      }
    });

    return res.status(201).json({
      success: true,
      message: "user enrolled successfully",
      data: newEnrollment
    });
  } catch (err) {
    next(err);
  }
};

// export const getEnrollments = async (req, res, next) => {
//   try {
//   } catch (err) {
//     next(err);
//   }
// };
