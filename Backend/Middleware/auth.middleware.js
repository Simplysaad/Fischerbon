import jwt from "jsonwebtoken";

export default function (req, res, next) {
  try {
    const { token } = req.cookies;
    if (!token) {
      // return res.redirect("/auth/login");
      return res.status(401).json({
        success: false,
        message: "No token provided"
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (decoded) {
      req.userId = decoded.userId;
      next();
    }
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "invalid or expired token"
    });
  }
}
