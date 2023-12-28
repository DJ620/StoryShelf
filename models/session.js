const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  location: Number,
  percent: Number,
  page: Number,
  chapter: Number,
  notes: String,
  duration: Object,
  date: String,
});

const SessionData = mongoose.model("SessionData", SessionSchema);

module.exports = SessionData;
