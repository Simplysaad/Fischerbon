import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import connectDB from "./Config/db.js";
import errorMiddleware from "./Middleware/error.middleware.js";

import authRoutes from "./Routes/auth.route.js";
import courseRoutes from "./Routes/course.route.js";
import adminRoutes from "./Routes/admin.route.js";
import enrollmentRoutes from "./Routes/enrollment.route.js";
import quizeRouter from "./Routes/quiz.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.static("./Public"));


app.listen(process.env.PORT, (err) => {
  if (!err) {
    connectDB();
    console.log(`server live at http://localhost:${process.env.PORT}`);
  }
});

app.use("/auth", authRoutes);
app.use("/course", courseRoutes);
app.use("/admin", adminRoutes);
app.use("/enroll", enrollmentRoutes);
app.use("/quiz", quizeRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Missing Route ${req.originalUrl}`
  });
});

app.use(errorMiddleware);
