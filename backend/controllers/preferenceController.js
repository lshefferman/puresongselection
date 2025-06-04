const Preference = require("../models/preferenceModel");
const SystemState = require("../models/systemstateModel");

// add a user's preferences
const addPreference = async (req, res) => {
  const { userId, preferences } = req.body;

  // Make sure we are in stage 3
  const systemState = await SystemState.findOne();
  if (systemState.stage !== 3) {
    return res
      .status(403)
      .json({ error: "Preference submission not allowed at this stage." });
  }

  // Enforce maximum total points
  const totalScore = preferences.reduce((sum, pref) => sum + pref.score, 0);
  const MAX_POINTS = 15;
  if (totalScore > MAX_POINTS) {
    return res.status(400).json({
      error: `You can only allocate up to ${MAX_POINTS} preference points. You submitted ${totalScore}.`,
    });
  }

  try {
    const bulkOps = preferences.map((pref) => ({
      updateOne: {
        filter: { user: userId, song: pref.songId },
        update: { user: userId, song: pref.songId, score: pref.score },
        upsert: true,
      },
    }));

    await Preference.bulkWrite(bulkOps);

    res.status(200).json({ message: "Preferences saved successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save preferences." });
  }
};

module.exports = { addPreference };
