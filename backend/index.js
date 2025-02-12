const express = require("express");
const cors = require("cors");
const authRoutes = require("./auth"); // Import authentication routes
const app = express();
const PORT = 5000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests

// Sample video data (this would be replaced by a real database in production)
const videos = [
  { id: 1, title: "The Matrix", description: "Sci-fi action movie" },
  { id: 2, title: "Inception", description: "Dream within a dream" },
  { id: 3, title: "Interstellar", description: "Space exploration adventure" },
];

// Video routes
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

// Authentication routes (this will handle login, signup, and token generation)
app.use("/api/auth", authRoutes); // Mount the auth routes at '/api/auth'

app.listen(PORT, () => {
  console.log(`Backend API is running on http://localhost:${PORT}`);
});
