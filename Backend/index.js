import "dotenv/config";
import express from "express";
import connectDB from "./Config/db.js";
import authRoutes from "./Routes/auth.route.js";
import errorMiddleware from "./Middleware/error.middleware.js";
import courseRoutes from "./Routes/course.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({}));

app.use(errorMiddleware);
app.listen(process.env.PORT, (err) => {
  if (!err) {
    connectDB();
    console.log(`sever live at http://localhost:${process.env.PORT}`);
  }
});

app.use("/auth", authRoutes);
app.use("/course", courseRoutes);
