import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
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

    const decoded = jwt.verify(token, SECRET_KEY);

    if (decoded) {
      req.userId = decoded.userId;
      next();
    }
  } catch (err) {
    next(err);
  }
}
