// models/punishment.js

const mongoose = require('mongoose');

const punishmentSchema = new mongoose.Schema({
  driverId: {
    type: String, 
    required: true,
  },
  driverName: {
    type: String,
    required: true,
  },
  licenseNumber: {
    type: String,
    required: true,
  },
  licensePlate: {
    type: String,
    required: true,
  },
  punishmentDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  punishmentType: {
    type: String,
    required: true,
  },
  numberOfDays: {
    type: Number,
  },
  fine: {
    type: Number,
    required: true,
  },
  employeeName: {
    type: String,
    required: true,
  },
});

const Punishment = mongoose.model('Punishment', punishmentSchema);

module.exports = Punishment;
