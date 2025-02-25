const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  thumbnail: { type: String, required: true }, // Image URL (or file path)
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Movie", MovieSchema);
