const express = require("express");

const router = express.Router();

const User = require("../models/User");

// Create New User
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    // simple validation
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    // check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // create user
    const newUser = await User.create({
      name,
      email,
    });

    res.status(201).json({
      success: true,
      message: "User added successfully",
      data: newUser,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// Get All Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Unable to fetch users",
    });
  }
});

module.exports = router;