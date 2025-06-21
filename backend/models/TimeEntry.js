const mongoose = require('mongoose');

const timeEntrySchema = new mongoose.Schema({
  username: String,
  startTime: Date,
  endTime: Date
});

module.exports = mongoose.model('TimeEntry', timeEntrySchema);