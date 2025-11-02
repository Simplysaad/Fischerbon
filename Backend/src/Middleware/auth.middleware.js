import jwt from "jsonwebtoken";
import User from "../Models/user.model.js";

export default async function authMiddleware(req, res, next) {
  try {
    const { token } = req.cookies;

    if (!token) {
      // return res.redirect("/auth/login");
      return res.status(401).json({
        success: false,
        message: "User not logged in",
      });
    }

    const { SECRET_KEY } = process.env;

    if (!SECRET_KEY) throw new Error("Empty JWT secret");

    const decoded = jwt.verify(token, SECRET_KEY);

    if (decoded?.userId) {
      const { userId } = decoded;
      const currentUser = await User.findOne({ _id: userId }).populate(
        "enrollments"
      );

      req.userId = userId;
      req.user = currentUser;

      next();
    }
  } catch (err) {
    next(err);
  }
}
