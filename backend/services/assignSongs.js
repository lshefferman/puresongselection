const User = require("../models/userModel");
const Song = require("../models/songModel");
const Preference = require("../models/preferenceModel");

async function generateAssignments() {
  const topSongs = await Song.find().sort({ votes: -1 }).limit(15);
  const users = await User.find({});
  const preferences = await Preference.find({});

  for (const song of topSongs) {
    const leaderId = song.suggestedBy.toString();
    const neededInstruments = song.instruments; // or requiredInstruments

    const songAssignments = [];

    for (const instrument of neededInstruments) {
      const matchingUsers = users
        .filter(
          (u) => u.instrument === instrument && u._id.toString() !== leaderId
        )
        .map((u) => {
          const pref = preferences.find(
            (p) =>
              p.user.toString() === u._id.toString() &&
              p.song.toString() === song._id.toString()
          );
          return {
            user: u,
            score: pref?.score || 0,
            currentCount: 0,
          };
        })
        .sort((a, b) => b.score - a.score);

      if (matchingUsers.length > 0) {
        const selected = matchingUsers.find(
          (u) => u.user.desiredSongCount > u.currentCount
        );
        if (selected) {
          songAssignments.push({
            user: selected.user._id,
            instrument,
            isLeader: false,
          });
          selected.currentCount += 1;
        }
      }
    }

    // Add the leader
    const leaderUser = users.find((u) => u._id.toString() === leaderId);
    if (leaderUser) {
      songAssignments.push({
        user: leaderUser._id,
        instrument: leaderUser.instrument,
        isLeader: true,
      });
    }

    // Save to the Song model
    song.assignedMembers = songAssignments;
    await song.save();
  }

  return true; // Or return the updated songs if needed
}
module.exports = generateAssignments;
