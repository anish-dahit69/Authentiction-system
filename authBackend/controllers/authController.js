import bcrypt from "bcrypt";
import { userModel } from "../models/usermodel.js";
import { generateToken } from "../utils/tokengenerator.js";
import { generateOTP, getOTPExpiry, isOTPExpired } from "../utils/otp.js";
import { mailConfiguration } from "../utils/nodmailer.js";

export const register = async (req, res) => {
  // console.log(req.body);
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    //checking existing user
    const userExists = await userModel.findOne({
      email,
    });

    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashPw = await bcrypt.hash(password, 10);

    // Generate OTP for email verification
    const otp = generateOTP();
    const otpExpiry = getOTPExpiry(3); // OTP valid for 3 minutes

    //create new user
    const newUser = await userModel.create({
      name,
      email,
      password: hashPw,
      role: "user",
      verifyOTP: otp,
      otpExpiry: otpExpiry,
    });
    // mail configuration
    mailConfiguration(newUser.email, otp);

    return res.status(201).json({
      success: true,
      message:
        "User registered successfully. Please verify your email with the OTP.",
      user: {
        id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Some error occurred" });
  }
};

// profilecontroller
export const profile = async (req, res) => {
  try {
    // req.user is populated by isLoggedIn middleware
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // Return user profile info (exclude sensitive fields)
    const { _id, name, email, role, isVerified } = req.user;

    return res.status(200).json({
      success: true,
      user: { id: _id, name, email, role, isVerified },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching user profile",
    });
  }
};

//verify email controller

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User already verified",
      });
    }
    if (user.verifyOTP !== otp) {
      user.otpAttempts += 1;
      await user.save();
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (user.otpAttempts >= 5) {
      return res.status(400).json({
        success: false,
        message: "Maximum OTP attempts exceeded. Please request a new OTP.",
      });
    }

    if (isOTPExpired(user.otpExpiry)) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired. Please request a new OTP.",
      });
    }

    // If OTP is valid, mark user as verified
    user.isVerified = true;
    user.verifyOTP = "";
    user.otpExpiry = 0;
    user.otpAttempts = 0;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occurred during OTP verification",
    });
  }
};

// login controller

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const user = await userModel.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Email and password do not match" });

    // token generation and send cookie
    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(200).json({ success: true, message: "Login successful", token });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error occurred during login" });
  }
};

// logout controller

export const logout = async (req, res) => {
  try {
    // Clear access token
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/", // ensure cookie path matches what was set
    });
    return res
      .status(200)
      .json({ success: true, message: "Logout successful" });
      
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
