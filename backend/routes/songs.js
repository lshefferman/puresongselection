const express = require("express");
const { getSongs, createSong } = require("../controllers/songController");

const router = express.Router();

// GET all songs
router.get("/", getSongs);

// POST a new song
router.post("/", createSong);

module.exports = router;
