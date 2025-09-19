import { Router } from "express";
import { getEnroll } from "../Controllers/enrollment.controller.js";

const router = Router();

router.get("/:courseId", getEnroll);

const enrollmentRoutes = router;
export default enrollmentRoutes;
