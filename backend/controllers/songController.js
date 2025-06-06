const Song = require("../models/songModel");
const SystemState = require("../models/systemstateModel");

// Maximum number of votes alloted to each user (same in frontend)
const MAX_VOTES_PER_USER = 10;

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
  const {
    title,
    link,
    suggestedBy,
    leaderInstrument,
    requiredInstruments,
    votes,
  } = req.body;

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
      link,
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

const voteSong = async (req, res) => {
  const { userId } = req.body;

  // Check if voting is allowed in the current stage
  const systemState = await SystemState.findOne();

  if (systemState.stage !== 2) {
    return res
      .status(403)
      .json({ error: "Voting is not allowed in this stage." });
  }

  // Count the number of songs the user has voted for
  const userVoteCount = await Song.countDocuments({ votes: userId });
  if (userVoteCount >= MAX_VOTES_PER_USER) {
    return res
      .status(400)
      .json({ error: "You have reached the maximum number of votes allowed." });
  }

  // Add vote if song is found
  const song = await Song.findById(req.params.id);
  if (!song) return res.status(404).json({ error: "Song not found" });

  if (song.votes.includes(userId)) {
    return res.status(400).json({ error: "User already voted for this song" });
  }

  song.votes.push(userId);
  await song.save();
  res.json(song);
};

const getTopSongs = async (req, res) => {
  const systemState = await SystemState.findOne();
  const maxSongs = systemState.maxSongsInSetlist;

  const songs = await Song.find().populate("suggestedBy", "name instrument");

  const sorted = songs
    .map((song) => ({
      ...song.toObject(),
      voteCount: song.votes.length,
    }))
    .sort((a, b) => b.voteCount - a.voteCount)
    .slice(0, maxSongs);

  res.json(sorted);
};

module.exports = {
  getSongs,
  createSong,
  voteSong,
  getTopSongs,
};
