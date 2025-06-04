const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const preferenceSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  song: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Song",
    required: true,
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
});

preferenceSchema.index({ user: 1, song: 1 }, { unique: true }); // prevent duplicate entries

module.exports = mongoose.model("Preference", preferenceSchema);
