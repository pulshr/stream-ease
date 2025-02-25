require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const authRoutes = require("./auth");

const app = express();
const PORT = 5000;
const MONGO_URI = process.env.MONGO_URI;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB (Only once)
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

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

// ✅ Video Data (Temporary, replace with DB)
const videos = [
  {
    id: 1,
    title: "The Matrix",
    description: "Sci-fi action",
    thumbnail: "/images/matrix.jpg",
  },
  {
    id: 2,
    title: "Inception",
    description: "Dream within a dream",
    thumbnail: "/images/inception.jpg",
  },
  {
    id: 3,
    title: "Interstellar",
    description: "Space exploration",
    thumbnail: "/images/interstellar.jpg",
  },
];

// ✅ Serve Static Images
app.use("/images", express.static(path.join(__dirname, "images")));

// ✅ Authentication Routes
app.use("/api/auth", authRoutes);

// ✅ Video Routes
app.get("/api/videos", (req, res) => {
  res.json(videos);
});

app.get("/api/videos/:id", (req, res) => {
  const videoId = parseInt(req.params.id);
  const video = videos.find((v) => v.id === videoId);

  if (video) {
    res.json(video);
  } else {
    res.status(404).json({ message: "Video not found" });
  }
});

// ✅ Admin-only Video Upload Route (Future Implementation)
app.post("/api/videos/upload", verifyAdmin, (req, res) => {
  res.json({ message: "Video uploaded successfully (Feature coming soon!)" });
});

// ✅ Start the Server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
