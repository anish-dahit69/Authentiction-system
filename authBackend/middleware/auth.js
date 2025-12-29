import jwt from "jsonwebtoken";
import { userModel } from "../models/usermodel.js";

// Verify JWT (access token)
export const isLoggedIn = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; // attach user to request
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError")
      return res.status(401).json({ message: "Token expired" });
    res.status(401).json({ message: "Invalid token" });
  }
};

// Admin role check
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access forbidden: Admin only" });
  }
  next();
};
