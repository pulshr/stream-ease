const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors()); // Enable CORS for all routes

// Sample video data
const videos = [
  { id: 1, title: "The Matrix", description: "Sci-fi action movie" },
  { id: 2, title: "Inception", description: "Dream within a dream" },
  { id: 3, title: "Interstellar", description: "Space exploration adventure" },
];

// Route to get all videos
app.get("/api/videos", (req, res) => {
  res.json(videos);
});

// Route to get video by id
app.get("/api/videos/:id", (req, res) => {
  const videoId = parseInt(req.params.id);
  const video = videos.find((v) => v.id === videoId);

  if (video) {
    res.json(video);
  } else {
    res.status(404).json({ message: "Video not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend API is running on http://localhost:${PORT}`);
});
