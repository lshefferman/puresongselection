const User = require("../models/User");

// Create a user
const createUser = async (req, res) => {
  try {
    const { name, instrument, email, role } = req.body;
    const user = await User.create({ name, instrument, email, role });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all users
const getUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });

  res.status(200).json(users);
};

module.exports = { createUser, getUsers };
