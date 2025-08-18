import express from "express";
import authController from "../conroller/authController.js";
import authMiddleware from "../middleware/isAuthenticated.js";

const router = express.Router();

// Register
router.post("/signup", authController.signup);

// Login
router.post("/login", authController.login);

// Protected Dashboard
router.get("/home", authMiddleware, authController.home);

export default router;
