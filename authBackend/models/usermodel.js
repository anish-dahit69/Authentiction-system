import mongoose from "mongoose";

// create user schema and model

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // allowed roles
      default: "user", // default role is user
    },
    verifyOTP: {
      type: String,
      default: "",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    otpAttempts: {
      type: Number,
      default: 0,
    },
    resetOTP: {
      type: String,
      default: "",
    },
    otpExpiry: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.model("User", UserSchema);
