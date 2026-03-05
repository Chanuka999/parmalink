import dotenv from "dotenv";

import express from "express";
import mongoose from "mongoose";
import User from "./models/user.js";

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

app.get("/", (req, res) => {
  console.log(req.body);

  console.log("get request");
  let prefix = "mr";
  if (req.body.gender == "female") {
    prefix = "ms";
  }
  res.json({
    message: "hello world" + " " + prefix + " " + req.body.name,
  });
});

app.post("/", (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    phone: req.body.phone,
    address: req.body.address,
  });

  user
    .save()
    .then(() => {
      res.json({
        message: "user added successfully",
      });
    })
    .catch(() => {
      res.json({
        message: "user added failed",
      });
    });
});

app.listen(5000, (req, res) => {
  console.log("server started on 5000");
});
