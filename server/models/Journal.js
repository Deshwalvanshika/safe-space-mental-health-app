const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema({
  mood: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Journal", journalSchema);
