import { Router } from "express";
// import { getEnroll } from "../Controllers/enrollment.controller.js";

import authMiddleware from "../Middleware/auth.middleware.js";

import {
  createEnrollment,
  getEnrollment,
  getEnrollments,
  verifyEnrollment,
} from "../Controllers/enrollment.controller.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getEnrollments);

router.post("/new/:courseId", createEnrollment);

router.get("/verify/:courseId", verifyEnrollment);

router.get("/:enrollmentId", getEnrollment);

const enrollmentRoutes = router;
export default enrollmentRoutes;
