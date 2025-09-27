import { Router } from "express";
// import { getEnroll } from "../Controllers/enrollment.controller.js";

import authMiddleware from "../Middleware/auth.middleware.js";
import { initialize, verify } from "../Utils/paystack.util.js";
import Payment from "../Models/payment.model.js";

import Enrollment from "../Models/enrollment.model.js";
import Course from "../Models/course.model.js";

const router = Router();

// router.get("/:courseId", getEnroll);

/**
 * Enroll a student
 *
 * make payment
 * create enrollment
 * track progress
 */

router.use(authMiddleware);
router.post("/new/:courseId", authMiddleware, async (req, res, next) => {
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
});

router.get("/verify/:courseId", async (req, res, next) => {
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

    if(!payment){
       return res.status(400).json({
         success: false,
         message: "Bad request - invalid payment reference "
       });
    }

    const newPayment = await Payment.create({
      ...payment.data,
      transactionId: payment.data?.id,
      userId: currentUser?._id
    });

    const newEnrollment = await Enrollment.create({
      courseId,
      userId: currentUser._id,
      payment: newPayment?._id
    });

    // TODO: Send user an email for successful enrollment

    return res.status(201).json({
      success: true,
      message: "user enrolled successfully",
      data: newEnrollment
    });
  } catch (err) {
    next(err);
  }
});

const enrollmentRoutes = router;
export default enrollmentRoutes;
