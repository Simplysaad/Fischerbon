import { Router } from "express";
const router = Router();

import {
  createCourse,
  updateCourse,
  createLesson,
  deleteCourse,
  deleteLesson,
  getCourse,
  getLesson,
  getCourses,
} from "../Controllers/course.controller.js";
import authMiddleware from "../Middleware/auth.middleware.js";
import { upload } from "../Config/cloudinary.js";

router.get("/", getCourses);

// Get a course
router.get("/:courseId", getCourse);

// Create a new course
router.post(
  "/create",
  authMiddleware,
  upload.single("thumbnail"),
  createCourse
);

// Update course
router.post(
  "/:courseId",
  authMiddleware,
  upload.single("thumbnail"),
  updateCourse
);
// router.post("/:courseId",  updateCourse);

// Add new lesson to a course
router.post(
  "/:courseId/lessons",
  upload.fields([
    { name: "lessonVideo", maxCount: 1 },
    { name: "lessonFiles", maxCount: 4 },
  ]),
  createLesson
);

// Delete a particular lesson
router.delete("/:courseId/lessons/:lessonId", authMiddleware, deleteLesson);

router.get("/:courseId/lessons/:lessonId", authMiddleware, getLesson);

// Delete a particular course
router.delete("/:courseId/", authMiddleware, deleteCourse);

export default router;
