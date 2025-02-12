const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const router = express.Router();
let users = []; // This is a temporary in-memory 'database'

const SECRET_KEY = "your_jwt_secret_key"; // Replace with a secure secret key

// User Signup route
router.post(
  "/signup",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if user already exists
    if (users.some((user) => user.email === email)) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user (you will replace this with a real database in production)
    users.push({ email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
  }
);

// User Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Generate JWT token
  const token = jwt.sign({ email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({ token });
});

module.exports = router;
