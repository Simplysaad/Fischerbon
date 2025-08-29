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

router.post("/create", upload.single("thumbnail"), createCourse);

router.post(
  "/:courseId/lesson",
  upload.fields([
    { name: "lessonVideo", maxCount: 1 },
    { name: "lessonFiles", maxCount: 4 }
  ]),
  createLesson
);

router.delete("/:courseId/lesson/:lessonId", deleteLesson);
router.delete("/:courseId/", deleteCourse);
export default router;
