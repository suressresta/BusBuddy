const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const Order = require("../models/order.model");
const app = express.Router();

// Get all users
app.get("/", async (req, res) => {
  try {
    const data = await UserModel.find({});
    return res.status(200).json({
      status: "Success",
      message: "Data retrieved successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: error.message });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await UserModel.findById(id);
    return res.status(200).json({
      status: "Success",
      message: "Data retrieved successfully",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: error.message });
  }
});

// Signup
app.post("/signup", async (req, res) => {
  try {
    const incomingData = { ...req.body };
    const { email, password } = incomingData;

    // Check if email already exists
    const userEmail = await UserModel.findOne({ email });
    if (userEmail) {
      return res.status(400).json({
        status: "Failed",
        message: "Please try with a different email",
      });
    }

    // Hashing the password before saving
    const encryptedPassword = await bcrypt.hash(password, 10);
    incomingData.password = encryptedPassword;

    // Create and save new user
    const newUser = new UserModel(incomingData);
    await newUser.save();

    return res.status(201).json({
      status: "Success",
      message: "Signup Successful",
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: error.message });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    let user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found. Please check your email.",
      });
    }

    // Compare the password with the hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "Failed",
        message: "Incorrect password. Please try again.",
      });
    }

    // Generate JWT token excluding sensitive data
    const token = jwt.sign(
      { id: user._id, userName: user.userName, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const userDetails = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      role: user.role,
    };

    return res.status(200).json({
      status: "Success",
      message: {
        user: userDetails,
        token,
      },
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: error.message });
  }
});

// Update user details
app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, userName, email, password, newPassword } =
    req.body;

  try {
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
    }

    // Match the current password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        status: "Failed",
        message: "Current password is incorrect.",
      });
    }

    // Update user fields
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (userName) user.userName = userName;
    if (email) user.email = email;

    // If a new password is provided
    if (newPassword) {
      if (newPassword === password) {
        return res.status(400).json({
          status: "Failed",
          message: "New password cannot be the same as the old password.",
        });
      }
      user.password = await bcrypt.hash(newPassword, 10);
    }

    await user.save();

    return res.status(200).json({
      status: "Success",
      message: "User details updated successfully",
      data: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: error.message });
  }
});

// Delete user
app.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await Order.deleteMany({ user: id });
    
    const deletedUser = await UserModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ status: "Failed", message: "User not found" });
    }

    return res.status(200).json({
      status: "Success",
      message: "User and associated orders deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ status: "Failed", message: error.message });
  }
});

module.exports = app;
