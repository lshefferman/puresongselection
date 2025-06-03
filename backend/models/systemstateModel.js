const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const systemStateSchema = new Schema({
  stage: {
    type: Number,
    enum: [1, 2, 3],
    required: true,
    default: 1,
  },
  maxSongsInSetlist: {
    type: Number,
    default: 15,
  },
  votingOpen: {
    type: Boolean,
    default: false,
  },
  preferencesOpen: {
    type: Boolean,
    default: false,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SystemState", systemStateSchema);
