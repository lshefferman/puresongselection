const generateAssignments = require("../services/assignSongs");

const getAssignments = async (req, res) => {
  try {
    const assignments = await generateAssignments();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate assignments." });
  }
};

module.exports = { getAssignments };
