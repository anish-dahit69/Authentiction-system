//get all users controller

import { userModel } from "../../models/usermodel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get user by id controller

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// role change

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const isSelf = req.user._id.toString() === userId;

    const updateData = {
      name: req.body.name,
      email: req.body.email,
    };

    if (!isSelf && typeof req.body.role !== "undefined") {
      updateData.role = req.body.role;
    }

    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    if (!Object.keys(updateData).length) {
      return res.status(400).json({
        success: false,
        message: "No valid fields to update",
      });
    }

    const user = await userModel
      .findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
      })
      .select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Update failed" });
  }
};

// delete user controller
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Prevent admin from deleting themselves
    if (req.user._id.toString() === userId) {
      return res.status(400).json({
        success: false,
        message: "Admin cannot delete their own account",
      });
    }
    const deletedUser = await userModel.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
