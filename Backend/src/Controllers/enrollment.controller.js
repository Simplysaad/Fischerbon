import { initialize, verify } from "../Utils/paystack.util.js";

import Payment from "../Models/payment.model.js";
import Enrollment from "../Models/enrollment.model.js";
import Course from "../Models/course.model.js";
import sendEmail from "../Utils/nodemailer.util.js";
import format from "../Utils/format.util.js";
import User from "../Models/user.model.js";

export const createEnrollment = async (req, res, next) => {
  try {
    // check if logged in
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - user not logged in",
      });
    }

    const { courseId } = req.params;

    const currentUser = req.user;
    const { email, enrollments } = currentUser;

    const isEnrolled = enrollments.find((e) => e.courseId === courseId);
    if (isEnrolled) {
      return res.status(400).json({
        success: false,
        message: "User is already enrolled",
      });
    }

    const currentCourse = await Course.findOne({ _id: courseId }).select(
      "_id price title"
    );

    if (!currentCourse) {
      return res.status(400).json({
        success: false,
        message: "invalid course id",
      });
    }

    const { price: amount } = currentCourse;

    const amountInKobo = amount * 100;
    // await sendEmail({
    //     to: currentUser.email,
    //     subject: "Course Enrollment Confirmation",
    //     template: "enrollmentSuccess",
    //     // message: "Thamks for enrolling in this course",
    //     data: {
    //       courseId,
    //       name: currentUser.name.split(" ")[0] || "",
    //       title: currentCourse.title,
    //       amount: amountInKobo / 100,
    //       date: format(Date.now()),
    //     },
    //  });
    const payment = await initialize(email, amountInKobo, courseId);

    if (!payment || !payment.status) {
      return res.status(500).json({
        success: false,
        message:
          payment?.message || "Error encountered while initializing payment",
      });
    }

    return res.status(201).json({
      success: true,
      message: "payment initialized",
      data: payment.data,
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
        message: "Unauthorized - user not logged in ",
      });
    }

    const currentUser = req.user;

    const payment = await verify(reference);

    if (!payment) {
      return res.status(400).json({
        success: false,
        message: "Bad request - invalid payment reference ",
      });
    }

    if (!payment.status || payment.data?.status !== "success") {
      return res.status(400).json({
        success: false,
        message: payment.message || "payment not completed",
      });
    }

    const newPayment = await Payment.create({
      ...payment.data,
      transactionId: payment.data?.id,
      userId: currentUser?._id,
    });

    const currentCourse = await Course.findById(courseId).select(
      "_id title price"
    );

    const newEnrollment = await Enrollment.create({
      courseId,
      userId: currentUser._id,
      payment: newPayment?._id,
    });

    await User.findByIdAndUpdate(currentUser._id, {
      $addToSet: { enrollments: newEnrollment._id },
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
        courseId,
        date: format(date),
      },
    });

    return res
      .redirect(`${process.env.FRONTEND_URL}/courses/${currentCourse.slug}`)
      .end();
    // return res.status(201).json({
    //   success: true,
    //   message: "user enrolled successfully",
    //   data: newEnrollment,
    // });
  } catch (err) {
    next(err);
  }
};

// export const getEnrollments = async (req, res, next) => {
//   try {
//     const currentUser = req.user;
//     if (!currentUser) throw new Error("Unauthorized - User  not logged in ");

//     let isAdmin = currentUser.role === "admin";
//     let filter = !isAdmin ? { _id: currentUser._id } : null;

//     const enrollments = await Enrollment.find(filter)
//       .sort({ createdAt: -1 })
//       // .populate({ path: "courseId", populate: { path: "lessons" } })
//       .populate({
//         path: "courseId",
//         select: "_id title lessons",
//         populate: { path: "lessons" },
//         path: "completedLessons",
//       })
//       .select("courseId completedLessons");

//     console.log(enrollments);

//     const enrollments2 = enrollments?.map((e) => {
//       // x = {
//       //   id: "course1",
//       //   title: "AutoCAD Beginner Fundamentals",
//       //   instructor: "Admin",
//       //   progress: 75, // in percentage
//       //   completedLessons: 15,
//       // };

//       const lastCompleted = e.completedLessons
//         .sort((a, b) => b.completedAt - a.completedAt)
//         .pop();

//       return {
//         _id: e.courseId._id || e.courseId,
//         progress:
//           (e.courseId.lessons?.length / e.completedLessons.length) * 100,
//         instructor: e.courseId.instructor,
//         lastCompleted,
//       };
//     });

//     return res.status(200).json({
//       success: true,
//       message: `${enrollments.length} retrieved successfully`,
//       data: enrollments,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

export const getEnrollments = async (req, res, next) => {
  try {
    const currentUser = req.user;
    if (!currentUser) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - User not logged in",
      });
    }
    const isAdmin = currentUser.role === "admin";

    // If not admin, filter enrollments by userId reference field, assuming Enrollment has user ref.
    const filter = !isAdmin ? { userId: currentUser._id } : {};

    // Fetch enrollments with nested lessons populated, selecting necessary fields only
    const enrollments = await Enrollment.find(filter)
      .sort({ createdAt: -1 })
      .populate({
        path: "courseId",
        select: "_id  slug title instructor lessons",
        populate: { path: "lessons", select: "_id title" },
      })
      .populate("completedLessons.lessonId")
      .select("courseId completedLessons");

    // Transform enrollments for response - calculate progress and last completed lesson
    const processedEnrollments = enrollments.map((enrollment) => {
      const { courseId, completedLessons } = enrollment;

      // Defensive default values
      const totalLessons = courseId?.lessons?.length || 0;
      const completedCount = completedLessons?.length || 0;

      // Calculate progress %, avoid division by zero
      const progress =
        totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

      // Get last completed lesson by completedAt desc
      const lastCompleted =
        completedLessons
          ?.slice()
          .sort((a, b) => b.completedAt - a.completedAt)
          .shift()?.lessonId || null;

      return {
        _id: courseId?._id || null,
        title: courseId?.title || "",
        slug: courseId?.slug,
        instructor: courseId?.instructor || "",
        progress: Math.round(progress * 100) / 100, // rounded to 2 decimals
        lastCompleted,
      };
    });
    return res.status(200).json({
      success: true,
      message: `${processedEnrollments.length} enrollments retrieved successfully`,
      data: processedEnrollments,
    });
  } catch (error) {
    next(error);
  }
};

export const getEnrollment = async (req, res, next) => {
  try {
    const currentUser = req.user;
    if (!currentUser) throw new Error("Unauthorized - User  not logged in ");

    const { enrollmentId } = req.params;

    const isEnrolled = currentUser.enrollments.includes(enrollmentId);
    const isAdmin = currentUser.role === "admin";

    if (!isAdmin && !isEnrolled) {
      return res.status(403).json({
        success: false,
        message: "Forbidden - User is not permitted to access this resource",
      });
    }

    const currentEnrollment = await Enrollment.findOne({
      _id: enrollmentId,
    }).populate({
      path: ["courseId", "completedLessons"],
    });

    return res.status(200).json({
      success: true,
      message: `Enrollment ${currentEnrollment._id} retrieved successfully`,
      data: currentEnrollment,
    });
  } catch (err) {
    next(err);
  }
};
