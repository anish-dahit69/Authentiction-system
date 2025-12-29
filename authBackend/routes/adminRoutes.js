import express from "express";
import { authorization } from "../middleware/authorization.js";
import {
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
} from "../controllers/admin/adminUserController.js";
import { isLoggedIn } from "../middleware/auth.js";

export const adminRouter = express.Router();
adminRouter.get("/users", isLoggedIn, authorization("admin"), getAllUsers);
adminRouter.get("/users/:id", isLoggedIn, authorization("admin"), getUserById);
adminRouter.patch("/users/:id", isLoggedIn, authorization("admin"), updateUser);
adminRouter.delete(
  "/users/:id",
  isLoggedIn,
  authorization("admin"),
  deleteUser
);
