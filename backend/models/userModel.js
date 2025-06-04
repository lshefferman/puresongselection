const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    instrument: {
      type: String,
      required: true,
    },
    desiredSongCount: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true, // allows multiple nulls
    },
    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
