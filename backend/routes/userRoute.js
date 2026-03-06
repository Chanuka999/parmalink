import express from "express";
import {
  createUser,
  getUser,
  loginUser,
} from "../controllers/userController.js";

const UserRouter = express.Router();

UserRouter.post("/user", createUser);
UserRouter.get("/user", getUser);
UserRouter.post("/login", loginUser);

export default UserRouter;
