const express = require("express");
const {
  getSongs,
  createSong,
  voteSong,
  getTopSongs,
} = require("../controllers/songController");

const router = express.Router();

// GET all songs
router.get("/", getSongs);

// POST a new song
router.post("/", createSong);

// Add vote for a song (PATCH number of votes in song)
router.patch("/:id/vote", voteSong);

// GET top songs
router.get("/top", getTopSongs);

module.exports = router;
