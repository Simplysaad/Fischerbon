import { Router } from "express";

import paystack from "@paystack/paystack-sdk";

import Course from "../Models/course.model.js";
import Payment from "../Models/payment.model.js";
import Enrollment from "../Models/enrollment.model.js";
import User from "../Models/user.model.js";


const router = Router();

router.get("/enroll/:courseId", async (req, res, next) => {
  try {
    const { userId } = req;

    const { reference } = req.query;
    const { courseId } = req.params;

    const action = reference ? "verify" : "initialize";

    const currentUser = await User.findOne({ _id: userId })
      .select("enrollments emailAddress _id ")
      .populate("enrollments");

    if (!currentUser) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - User not logged in "
      });
    }

    const { emailAddress, enrollments: currentUserEnrollments } = currentUser;

    // Check if user has previously enrolled
    const isPreviouslyEnrolled = currentUserEnrollments.find(
      (e) => e.courseId === courseId
    );

    if (isPreviouslyEnrolled) {
      return res.status(400).json({
        success: false,
        message: "user is already enrolled to this course"
      });
    }

    const currentCourse = await Course.findOne({ _id: courseId });

    if (!currentCourse) {
      return res.status(404).json({
        success: false,
        message: "Invalid Course Id - Course does not exist "
      });
    }

    const { price, title } = currentCourse;

    const method = action === "verify" ? "get" : "post";
    const body = JSON.stringify({
      amount: price * 100,
      email: "saadidris23@gmail.com",
      metadata: {
        custom_fields: [
          {
            display_name: "Title",
            variable_name: "title",
            value: title
          }
        ]
      }
    });
    console.log(method, body);

    // Initialize transaction
    const response = await fetch(
      `https://api.paystack.co/transaction/${action}/${reference || ""}`,
      {
        method,
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        },
        body: method === "post" ? body : null
      }
    );

    const { data, status, message } = await response.json();

    if (!status) {
      return res.status(400).json({
        success: false,
        message
      });
    }
    console.log(data);
    let currentPayment = await Payment.findOneAndUpdate(
      { reference: data?.reference },
      {
        $set: {
          transactionId: data?.id
        },
        $setOnInsert: {
          ...data,
          courseId,
          userId,
          amount: price * 100
        }
      },
      { upsert: true, new: true }
    );

    if (action === "verify") {
      const newEnrollment = new Enrollment({
        userId,
        courseId,
        paymentId: currentPayment?._id,
        lastAccessed: new Date()
      });

      await newEnrollment.save();

      const newSet = new Set(currentUser.enrollments);
      newSet.add(newEnrollment._id);

      currentUser.enrollments = newSet;
      await currentUser.save();

      return res.status(201).json({
        success: true,
        message,
        data: newEnrollment
      });
    }

    return res.status(201).json({
      success: true,
      message,
      data: currentPayment
    });
  } catch (err) {
    next(err);
  }
});

const enrollmentRoutes = router;
export default enrollmentRoutes;
