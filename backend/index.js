import dotenv from "dotenv";

import express from "express";
import mongoose from "mongoose";

import UserRouter from "./routes/userRoute.js";

const app = express();

app.use(express.json());
dotenv.config();

const connectionString = process.env.MONGO_URL;
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("database connected");
  })
  .catch(() => {
    console.log("database connection failed");
  });

app.use(UserRouter);

app.listen(5000, (req, res) => {
  console.log("server started on 5000");
});
