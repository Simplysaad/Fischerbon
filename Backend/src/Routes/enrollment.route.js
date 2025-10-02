import { Router } from "express";
// import { getEnroll } from "../Controllers/enrollment.controller.js";

import authMiddleware from "../Middleware/auth.middleware.js";

import {
  createEnrollment,
  verifyEnrollment
} from "../Controllers/enrollment.controller.js";

const router = Router();

// router.get("/:courseId", getEnroll);

/**
 * Enroll a student
 *
 * make payment
 * create enrollment
 * track progress
 */

router.use(authMiddleware);
router.post("/new/:courseId", createEnrollment);

router.get("/verify/:courseId", verifyEnrollment);

const enrollmentRoutes = router;
export default enrollmentRoutes;
