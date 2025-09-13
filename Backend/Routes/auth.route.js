import { Router } from "express";
const router = Router();

import { getResetPassword, logout, postLogin, postRegister, postResetPassword } from "../Controllers/auth.controller.js";

router.post("/register", postRegister);

router.post("/login", postLogin);

router.all("/logout", logout);

router.post("/reset-password/:token", getResetPassword);

router.post("/reset-password", postResetPassword);

export default router  
