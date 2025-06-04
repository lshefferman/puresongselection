const express = require("express");
const { getAssignments } = require("../controllers/assignmentController");

const router = express.Router();

router.get("/", getAssignments);

module.exports = router;
