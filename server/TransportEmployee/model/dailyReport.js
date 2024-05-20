const mongoose = require('mongoose');

const dailyReportSchema = new mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    required: true,
  },
  attendanceStatus: {
    type: String,
    required: true,
  },
  punishmentsGiven: {
    type: [String],
    default: [],
  },
  warningsSent: {
    type: String,
    required: true,
  },
  date: {
    type: Date, 
    required: true,
  },
});

const DailyReport = mongoose.model('DailyReport', dailyReportSchema);

module.exports = DailyReport;
