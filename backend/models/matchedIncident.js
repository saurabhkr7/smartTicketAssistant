const mongoose = require("mongoose");

const matchedIncidentSchema = new mongoose.Schema({
  number: { type: String, required: true },
  matchedWith: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MatchedIncident", matchedIncidentSchema);
