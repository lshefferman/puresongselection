const Song = require("../models/songModel");
const SystemState = require("../models/systemstateModel");

// get all songs
const getSongs = async (req, res) => {
  const songs = await Song.find({}).sort({ createdAt: -1 });

  res.status(200).json(songs);
};

// create a new song
const createSong = async (req, res) => {
  // only allow song submission in stage 1
  const systemState = await SystemState.findOne();
  if (systemState.stage !== 1) {
    return res
      .status(404)
      .json({ error: "Song submission is not allowed in this stage." });
  }

  // get fields from request body
  const { title, suggestedBy, leaderInstrument, requiredInstruments, votes } =
    req.body;

  // only allow users to submit 2 songs max
  const existingCount = await Song.countDocuments({ suggestedBy });

  if (existingCount >= 2) {
    return res
      .status(400)
      .json({ error: "You have already submitted 2 songs." });
  }

  // add doc to db
  try {
    const song = await Song.create({
      title,
      suggestedBy,
      leaderInstrument,
      requiredInstruments,
      votes,
    });
    res.status(200).json(song);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getSongs,
  createSong,
};
