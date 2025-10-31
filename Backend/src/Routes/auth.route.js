import { Router } from "express";
const router = Router();

import authMiddleware from "../Middleware/auth.middleware.js";
import {
  checkAuthStatus,
  postRegister,
  postLogin,
  forgotPassword,
  resetPassword,
  logout,
} from "../Controllers/auth.controller.js";

router.get("/status", authMiddleware, checkAuthStatus);

router.post("/register", postRegister);

router.post("/login", postLogin);

router.all("/logout", logout);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

export default router;
