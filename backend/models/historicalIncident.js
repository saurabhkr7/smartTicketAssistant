const mongoose = require("mongoose");

const historicalIncidentSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("HistoricalIncident", historicalIncidentSchema);
