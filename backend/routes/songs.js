const express = require("express");

const router = express.Router();

// GET all songs
router.get("/", (req, res) => {
  res.json({ mssg: "GET all songs" });
});

// POST a new song
router.post("/", (req, res) => {
  res.json({ mssg: "POST a new song" });
});

module.exports = router;
