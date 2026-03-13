import dotenv from "dotenv";

import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cors from "cors";

import UserRouter from "./routes/userRoute.js";
import MedicineRouter from "./routes/medicineRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.use((req, res, next) => {
  let token = req.header("Authorization");
  if (token != null) {
    token = token.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET, (err, decorded) => {
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

app.use("/api/users", UserRouter);
app.use("/api/medicine", MedicineRouter);

app.listen(5000, (req, res) => {
  console.log("server started on 5000");
});
