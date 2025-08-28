import "dotenv/config";
import express from "express";
import connectDB from "./Config/db.js";
import authRoute from "./Routes/auth.route.js";

const app = express();

app.listen(process.env.PORT, (err) => {
  if (!err) {
    connectDB();
    console.log(`sever live at http://localhost:${process.env.PORT}`);
  }
});


app.use("/auth", authRoute)