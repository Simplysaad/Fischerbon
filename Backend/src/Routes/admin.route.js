import { Router } from "express";
import {
  getCourses,
  getDashboardInfo,
} from "../Controllers/admin.controller.js";
import adminMiddleware from "../Middleware/admin.middleware.js";
const adminRouter = Router();

adminRouter.use(adminMiddleware);

adminRouter.get("/dashboard", getDashboardInfo);
adminRouter.get("/courses", getCourses);
export default adminRouter;
