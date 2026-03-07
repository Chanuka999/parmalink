import dotenv from "dotenv";

import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import UserRouter from "./routes/userRoute.js";
import MedicineRouter from "./routes/medicineRoute.js";

const app = express();

app.use(express.json());
dotenv.config();

app.use((req, res, next) => {
  let token = req.header("Authorization");
  if (token != null) {
    token = token.replace("Bearer ", "");
    jwt.verify(token, "jwt-secret", (err, decorded) => {
      if (decorded == null) {
        res.status(404).json({
          message: "invalid token please login again",
        });
        return;
      } else {
        req.user = decorded;
      }
    });
  }
  next();
});

const connectionString = process.env.MONGO_URL;
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("database connected");
  })
  .catch(() => {
    console.log("database connection failed");
  });

app.use("/users", UserRouter);
app.use("/medicine", MedicineRouter);

app.listen(5000, (req, res) => {
  console.log("server started on 5000");
});
