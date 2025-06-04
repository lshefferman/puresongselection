const express = require("express");
const { addPreference } = require("../controllers/preferenceController");

const router = express.Router();

// POST preferences from users
router.post("/", addPreference);

module.exports = router;
