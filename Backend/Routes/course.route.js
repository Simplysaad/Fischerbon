import { Router } from "express";
const router = Router();

import multer from "multer";
const upload = multer({ dest: "./Uploads" });

import {
  createCourse,
  createLesson,
  deleteCourse,
  deleteLesson,
  getCourse,
  getLesson
} from "../Controllers/course.controller.js";
import authMiddleware from "../Middleware/auth.middleware.js";

router.use(authMiddleware);

// Get a course

router.get("/:courseId", getCourse);
//Create a new course
router.post("/create", upload.single("thumbnail"), createCourse);

// Add new lesson to a course
router.post(
  "/:courseId/lesson",
  upload.fields([
    { name: "lessonVideo", maxCount: 1 },
    { name: "lessonFiles", maxCount: 4 }
  ]),
  createLesson
);

// Delete a particular lesson
router.delete("/:courseId/lesson/:lessonId", deleteLesson);
router.get("/:courseId/lesson/:lessonId", getLesson);

// Delete a particular course
router.delete("/:courseId/", deleteCourse);
export default router;
