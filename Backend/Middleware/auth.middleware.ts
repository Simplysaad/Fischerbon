import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export interface JWTRequest extends Request {
  userId?: string;
}

export default function authMiddleware(
  req: JWTRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const { token } = req.cookies;

    if (!token) {
      // return res.redirect("/auth/login");
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    const { SECRET_KEY } = process.env;

    if (!SECRET_KEY) throw new Error("Empty JWT secret");

    const decoded = jwt.verify(token, SECRET_KEY) as { userId: string }

    if (decoded) {
      req.userId = decoded.userId;
      next();
    }
  } catch (err) {
    next(err);
  }
}
