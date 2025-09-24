import { NextFunction, Response, Router } from "express";
const router = Router();

import multer from "multer";
import User from "../Models/user.model.js";
import Course from "../Models/course.model.js";
import authMiddleware, { JWTRequest } from "../Middleware/auth.middleware.js";
const upload = multer({ dest: "./Uploads" });

//Get all courses from a single instructor
router.use(authMiddleware)
router.get("/", async (req:JWTRequest, res:Response, next:NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - user not logged in "
      });
    }

    const currentUser = await User.findOne({ _id: req.userId });
    if (!currentUser /* && currentUser.role !== ("admin" || "instructor") */) {
      return res.status(404).json({
        success: false,
        message: "Unauthorized - user not found "
      });
    }

    const currentInstructorCourses = await Course.find({
      instructorId: currentUser._id
    }).populate("lessons");

    return res.status(200).json({
      success: true,
      message: "retrieved current user courses successfully",
      data: currentInstructorCourses
    });
  } catch (err) {
    next(err);
  }
});

const adminRoutes = router;
export default adminRoutes;
