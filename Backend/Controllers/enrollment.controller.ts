import paystack from "@paystack/paystack-sdk";

import Course from "../Models/course.model.js";
import Payment from "../Models/payment.model.js";
import Enrollment from "../Models/enrollment.model.js";
import User from "../Models/user.model.js";

export const getEnroll = async (req, res, next) => {
  try {
    const { userId } = req.session

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

    // Check course for validity
    const currentCourse = await Course.findOne({ _id: courseId });

    if (!currentCourse) {
      return res.status(404).json({
        success: false,
        message: "Invalid Course Id - Course does not exist "
      });
    }

    // Check User for enrollment status
    const isPreviouslyEnrolled = currentUserEnrollments.find(
      (e) => e.courseId.toString() === courseId.toString()
    );

    if (isPreviouslyEnrolled) {
      return res.status(400).json({
        success: false,
        message: "user is already enrolled to this course"
      });
    }
 
    const { price, title } = currentCourse;
    const priceInKobo = price * 100; // convert naira to kobo for paystack

    const apiUrl = `https://api.paystack.co/transaction/${action}/${
      reference || ""
    }`;

    const options = {
      method: action === "verify" ? "get" : "post",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
      }
    };
    if (action === "initialize") {
      options.body = JSON.stringify({
        amount: priceInKobo,
        email: emailAddress,
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

      options.headers["Content-Type"] = "application/json";
    }

    console.log(method, body);

    // Initialize transaction
    const response = await fetch(apiUrl, options);

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: `Paystack Api error ${response.statusText}`
      });
    }

    const { data, status, message } = await response.json();

    if (!status) {
      return res.status(400).json({
        success: false,
        message
      });
    }

    // Update payment record
    const paymentUpdate = {
      $set: {
        transactionId: data?.id
      },
      $setOnInsert: {
        ...data,
        courseId,
        userId,
        amount: priceInKobo
      }
    };
    // console.log(data);
    let currentPayment = await Payment.findOneAndUpdate(
      { reference: data?.reference },
      paymentUpdate,
      { upsert: true, new: true }
    );

    // On verification, create enrollment
    if (data.status === "success" && action === "verify") {
      const newEnrollment = new Enrollment({
        userId,
        courseId,
        paymentId: currentPayment?._id,
        lastAccessed: new Date()
      });

      await newEnrollment.save();

      const newSet = new Set(currentUser.enrollments);
      newSet.add(newEnrollment._id);

      currentUser.enrollments = Array.from(newSet);
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
};
