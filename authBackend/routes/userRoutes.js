import express from "express";
import {
  register,
  login,
  logout,
  verifyOtp,
  profile,
} from "../controllers/authController.js";
import { isLoggedIn } from "../middleware/auth.js";

export const userRouter = express.Router();
userRouter.get("/profile", isLoggedIn, profile);
userRouter.post("/register", register);
userRouter.post("/verifyotp", verifyOtp);
userRouter.post("/login", login);
userRouter.post("/logout", isLoggedIn, logout);
