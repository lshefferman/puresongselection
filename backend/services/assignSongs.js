const User = require("../models/userModel");
const Song = require("../models/songModel");
const Preference = require("../models/preferenceModel");

async function generateAssignments() {
  const topSongs = await Song.find().sort({ votes: -1 }).limit(15);
  const users = await User.find({});
  const preferences = await Preference.find({});

  const assignments = [];

  for (const song of topSongs) {
    const leader = song.suggestedBy.toString();
    const neededInstruments = song.instruments;

    const songAssignments = [];

    for (const instrument of neededInstruments) {
      const matchingUsers = users
        .filter(
          (u) => u.instrument === instrument && u._id.toString() !== leader
        )
        .map((u) => {
          const pref = preferences.find(
            (p) =>
              p.user.toString() === u._id.toString() &&
              p.song.toString() === song._id.toString()
          );
          return {
            user: u,
            score: pref.score || 0,
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
            userId: selected.user._id,
            name: selected.user.name,
            instrument,
            isLeader: false,
          });
          selected.currentCount += 1;
        }
      }
      songAssignments.push({
        userId: leader,
        name: users.find((u) => u._id.toString() === leader)?.name || "Unknown",
        instrument:
          users.find((u) => u._id.toString() === leader)?.instrument ||
          "unknown",
        isLeader: true,
      });
    }
    assignments.push({
      songId: song._id,
      title: song.title,
      members: songAssignments,
    });
  }
  return assignments;
}

module.exports = generateAssignments;
