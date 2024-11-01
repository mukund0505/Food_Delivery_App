import express from "express";
import bcrypt from "bcryptjs"; // Import bcrypt
import { body, validationResult } from "express-validator";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Signup Route
router.post(
  "/createuser",
  [
    body("name")
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters long")
      .trim()
      .escape(),
    body("location")
      .notEmpty()
      .withMessage("Location is required")
      .trim()
      .escape(),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/\d/)
      .withMessage("Password must contain at least one number"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

      // Create a new user with the hashed password
      await User.create({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: hashedPassword,
      });

      res.json({ success: true });
    } catch (error) {
      console.error("Error", error);
      res.status(500).json({ success: false, error: "Server Error" });
    }
  }
);

// Login Route
router.post(
  "/loginuser",
  [
    body("email", "Please enter a valid email").isEmail(),
    body("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      // Compare the entered password with the hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      // Generate JWT upon successful login
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // Send success response with token and message
      return res.json({ success: true, token, message: "Login successful" });
    } catch (error) {
      console.error("Error during login:", error.message);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

export default router;
