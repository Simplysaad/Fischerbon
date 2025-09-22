import { Router } from "express";
const router = Router();

import {
  checkAuthStatus,
  resetPassword,
  logout,
  postLogin,
  postRegister,
  forgotPassword
} from "../Controllers/auth.controller.js";

router.get("/status", checkAuthStatus);

router.post("/register", postRegister);

router.post("/login", postLogin);

router.all("/logout", logout);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password", resetPassword);

export default router;
