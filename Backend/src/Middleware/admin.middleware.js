import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";

export default async function adminMiddleware(req, res, next) {
  try {
    const { token } = req.cookies;

    if (!token) {
      // return res.redirect("/auth/login");
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const { SECRET_KEY } = process.env;

    if (!SECRET_KEY) throw new Error("Empty JWT secret");

    const decoded = jwt.verify(token, SECRET_KEY);

    if (!decoded) throw new Error("Invalid token");

    const { userId } = decoded;
    const currentUser = await User.findOne({ _id: userId });

    if (!currentUser) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    if (currentUser.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden - Access denied",
      });
    }

    req.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
}
