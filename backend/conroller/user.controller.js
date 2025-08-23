import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";

// Load ENV AI API
const SMART_AI_API = process.env.SMART_AI_API;

// Register User
export const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
console.log(req.body);

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(409).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({ fullname, email, password: hashedPassword });

    res.status(201).json({ message: "Registration successful", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// Logout
export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Profile update failed", error: err.message });
  }
};

// 🔍 Smart Resume Analyzer (AI Integration)
export const analyzeResume = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user || !user.resume) {
      return res.status(404).json({ message: "User or resume not found" });
    }

    const response = await axios.post(SMART_AI_API, {
      resumeUrl: user.resume,
      skills: user.profile.skills
    });

    const { smartTags, aiSuggestedRoles } = response.data;

    user.smartTags = smartTags;
    user.aiSuggestedRoles = aiSuggestedRoles;
    await user.save();

    res.status(200).json({
      message: "Resume analyzed successfully",
      smartTags,
      aiSuggestedRoles
    });
  } catch (err) {
    res.status(500).json({ message: "Resume analysis failed", error: err.message });
  }
};
