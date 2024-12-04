const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");

const app = express.Router();

app.post("/signup", async (req, res) => {
  let { email } = req.body;

  try {
    let user = await UserModel.findOne({ email });

    if (user) {
      return res.status(400).send({
        status: "Failed",
        message: "Please try with a different email",
      });
    }

    // Hash the password before saving
    req.body.password = await bcrypt.hash(req.body.password, 10);

    user = await UserModel.create(req.body);

    return res.status(201).send({
      status: "Success",
      message: "Signup Successful",
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, status: "Failed" });
  }
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        status: "Failed",
        message: "Please check your email",
      });
    }

    // Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        status: "Failed",
        message: "Please check your password",
      });
    }

    // Generate JWT token excluding sensitive data
    const token = jwt.sign({ id: user._id, email: user.email }, "1234");

    return res.status(200).send({
      status: "Success",
      message: {
        user: { id: user._id, email: user.email, password: user.password },
        token,
      },
    });
  } catch (error) {
    return res.status(500).send({ message: error.message, status: "Failed" });
  }
});

module.exports = app;
