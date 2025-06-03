const express = require("express");
const {
  getSystemState,
  updateSystemState,
} = require("../controllers/systemController");

const router = express.Router();

// GET current system state
router.get("/state", getSystemState);

// POST or PATCH to update system state
router.post("/state", updateSystemState);

module.exports = router;
