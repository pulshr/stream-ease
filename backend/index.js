require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Movie = require("./models/Movie");

const app = express();
const PORT = 5000;
const MONGO_URI = process.env.MONGO_URI;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

// ✅ Connect to MongoDB
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Get all movies
app.get("/api/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching movies" });
  }
});

// ✅ Get a single movie by ID
app.get("/api/movies/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: "Error fetching movie" });
  }
});

// ✅ Middleware to verify Admin
const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err || user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    req.user = user;
    next();
  });
};

// ✅ Add a new movie (Admin Only)
app.post("/api/movies", verifyAdmin, async (req, res) => {
  const { title, description, thumbnail } = req.body;

  if (!title || !description || !thumbnail) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newMovie = new Movie({ title, description, thumbnail });
    await newMovie.save();
    res.status(201).json({ message: "Movie added successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error adding movie" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
