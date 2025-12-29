import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { corsOptions } from "./config/cors.js";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import { userRouter } from "./routes/userRoutes.js";
import { adminRouter } from "./routes/adminRoutes.js";

const app = express();

// middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/", (req, res) => res.send("Auth Backend is running"));
app.use("/api/auth", userRouter);
app.use("/api/admin", adminRouter);
// start server after DB connection
const startServer = async () => {
  try {
    await connectDB();
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();
