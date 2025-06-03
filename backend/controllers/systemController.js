const SystemState = require("../models/systemstateModel");

// get current system state
const getSystemState = async (req, res) => {
  const state = await SystemState.findOne();
  res.status(200).json(state);
};

// update system state
const updateSystemState = async (req, res) => {
  const { stage, votingOpen, preferencesOpen } = req.body;
  let state = await SystemState.findOne();

  if (!state) {
    state = new SystemState({ stage, votingOpen, preferencesOpen });
  } else {
    if (stage !== undefined) state.stage = stage;
    if (votingOpen !== undefined) state.votingOpen = votingOpen;
    if (preferencesOpen !== undefined) state.preferencesOpen = preferencesOpen;
    state.updatedAt = new Date();
  }

  await state.save();
  res.json(state);
};

module.exports = {
  getSystemState,
  updateSystemState,
};
