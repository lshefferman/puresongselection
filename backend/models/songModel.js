const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const songSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    suggestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    leaderInstrument: {
      type: String,
      required: true,
    },
    requiredInstruments: {
      type: [String],
      required: true,
    },
    assignedMembers: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        instrument: String,
        isLeader: Boolean,
      },
    ],
    votes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Song", songSchema);
