import express from "express";
import { createUser, getUser } from "../controllers/userController.js";

const UserRouter = express.Router();

UserRouter.post("/user", createUser);
UserRouter.get("/user", getUser);

export default UserRouter;
