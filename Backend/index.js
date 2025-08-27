import "dotenv/config";
import express from "express";
import connectDB from "./Config/db";

const app = express();

app.listen(process.env.PORT, (err) => {
  if (!err) connectDB();
});

