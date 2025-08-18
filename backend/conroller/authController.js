import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const authController = {
  // Signup
  signup: async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
      res.status(201).json({ message: "User signed up successfully", user });
    } catch (err) {
      res.status(400).json({ error: "User already exists" });
    }
  },

  // Login
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: "Invalid credentials" });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(400).json({ error: "Invalid credentials" });

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({ token });
    } catch (err) {
      res.status(500).json({ error: "Login failed" });
    }
  },

  // Home
  home: (req, res) => {
    res.json({ message: "Welcome to the home page" });
  }
};

export default authController;
