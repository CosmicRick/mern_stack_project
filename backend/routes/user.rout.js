import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import user from "../models/user.model.js"
import {
  loginUser,
  registerUser,
  logoutUser,
  updateProfile,
  analyzeResume
} from '../conroller/user.controller.js'; 

import authMiddleware from "../middleware/isAuthenticated.js";

const router = express.Router();


router.post("/signup", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Create new user
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword, // store hashed
    });

    await newUser.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid email or password" });

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid email or password" });

    // 3. Create JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        id: user._id,
        fullname: user.fullname,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

export default router;
