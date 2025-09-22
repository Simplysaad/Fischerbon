import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import connectDB from "./Config/db";
import errorMiddleware from "./Middleware/error.middleware";

import authRoutes from "./Routes/auth.route";
import courseRoutes from "./Routes/course.route";
import adminRoutes from "./Routes/admin.route";
import enrollmentRoutes from "./Routes/enrollment.route";
import quizeRouter from "./Routes/quiz.route";
import { keepAlive } from "./Cron/keep-alive";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.static("./Public"));

app.use(errorMiddleware);

app.listen(process.env.PORT, (err) => {
  if (!err) {
    connectDB();
    console.log(`server live at http://localhost:${process.env.PORT}`);
  }
});

keepAlive()

app.get("/", (req, res, next) => {
  try {
    return res.status(200).json({
    success: true,
    message: "Backend is up and running",
  })
  } catch (err) {
    next(err)
  }
})


app.use("/auth", authRoutes);
app.use("/course", courseRoutes);
app.use("/admin", adminRoutes);
app.use("/enroll", enrollmentRoutes);
app.use("/quiz", quizeRouter);
