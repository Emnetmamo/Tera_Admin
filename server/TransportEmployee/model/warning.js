// warningModel.js

const mongoose = require('mongoose');

const warningSchema = new mongoose.Schema({
  driverId: { type: String, required: true },
  driverName: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  licensePlate: { type: String, required: true },
  date: { type: Date, default: Date.now },
  message: { type: String, required: true }
});

const Warning = mongoose.model('Warning', warningSchema);

module.exports = Warning;
