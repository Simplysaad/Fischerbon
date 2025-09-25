import { Router } from "express";
const router = Router();

import {
  createCourse,
  createLesson,
  deleteCourse,
  deleteLesson,
  getCourse,
  getLesson,
  getCourses,
  getLessons
} from "../Controllers/course.controller.js";
import authMiddleware from "../Middleware/auth.middleware.js";
import { upload } from "../Config/cloudinary.js";

router.use(authMiddleware);

router.get("/", getCourses);

// Get a course
router.get("/:courseId", getCourse);

//Create a new course
router.post("/create", upload.single("thumbnail"), createCourse);

// Add new lesson to a course
router.post(
  "/:courseId/lessons",
  upload.fields([
    { name: "lessonVideo", maxCount: 1 },
    { name: "lessonFiles", maxCount: 4 }
  ]),
  createLesson
);

// Delete a particular lesson
router.delete("/:courseId/lessons/:lessonId", deleteLesson);


router.get("/:courseId/lessons/", getLessons);

router.get("/:courseId/lessons/:lessonId", getLesson);

// Delete a particular course
router.delete("/:courseId/", deleteCourse);

export default router;
