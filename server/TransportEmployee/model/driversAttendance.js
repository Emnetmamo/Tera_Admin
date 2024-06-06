const mongoose = require('mongoose');

const driversAttendanceSchema = new mongoose.Schema({
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    required: true,
  },
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TransportEmployee',
    required: true,
  },
  date: { type: Date, required: true },
  rounds: [{
    roundNumber: { type: Number, required: true },
    status: { type: String, enum: ['Complete', 'Incomplete'], required: true },
    time: { type: Date },
    qrCode: { type: String, default: '' }, // Default value of an empty string for qrCode
  }],
  overallStatus: { type: String, enum: ['Completed', 'Incomplete'], required: true },
});

const DriversAttendance = mongoose.model('DriversAttendance', driversAttendanceSchema);

module.exports = DriversAttendance;
