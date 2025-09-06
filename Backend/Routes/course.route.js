import { Router } from "express";
const router = Router();

import multer from "multer";
const upload = multer({ dest: "./Uploads" });

import {
  createCourse,
  createLesson,
  deleteCourse,
  deleteLesson
} from "../Controllers/course.controller.js";

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

// Delete a particular course
router.delete("/:courseId/", deleteCourse);
export default router;
