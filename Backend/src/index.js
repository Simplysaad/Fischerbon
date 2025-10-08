import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import connectDB from "./Config/db.js";
import errorMiddleware from "./Middleware/error.middleware.js";

import authRoutes from "./Routes/auth.route.js";
import adminRouter from "./Routes/admin.route.js";
import courseRoutes from "./Routes/course.route.js";
import enrollmentRoutes from "./Routes/enrollment.route.js";
import quizRouter from "./Routes/quiz.route.js";

import keepAlive from "./Cron/keep-alive.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.static("./src/Public"));

const server = app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`server live at http://localhost:${process.env.PORT}`);
});

server.on("error", (err) => {
  console.error("Server startup error:", err);
  process.exit(1);
});

keepAlive();

app.get("/", (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "Backend is up and running",
  });
});

app.use("/auth", authRoutes);

app.use("/courses", courseRoutes);
app.use("/enrollments", enrollmentRoutes);

app.use("/admin", adminRouter);

app.use("/quiz", quizRouter);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Missing Route ${req.originalUrl}`,
  });
});

app.use(errorMiddleware);
