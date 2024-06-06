const mongoose = require('mongoose');

const transportEmployeeSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  sex: String,
  phoneNumber: String,
  employeeId: { type: String, unique: true },
  address: String,
  cityDistrict: String,
  Terminal: String,
  username: { type: String, unique: true }, // randomly generated on the server side 
  password: String, // randomly generated on the server side
  photoUpload: { type: String, default: '' }, // to be filled by the supervisor later on
  assignedDrivers: { 
    type: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Driver' 
    }],
    default: []
  }, // list of drivers assigned to this employee, initially empty
  isActive: { type: Boolean, default: true },
  status: { type: String, default: 'working' },
  updatedAt: { type: Date, default: Date.now }, // Account creation date later updated based on activation/deactivation
});

const TransportEmployee = mongoose.model('TransportEmployee', transportEmployeeSchema);

module.exports = TransportEmployee;
