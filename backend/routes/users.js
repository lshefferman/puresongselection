const express = require("express");
const { createUser, getUsers } = require("../controllers/usersController");

const router = express.Router();

// Create a user
router.post("/", createUser);

// Get all users
router.get("/", getUsers);

module.exports = router;
