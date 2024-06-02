const mongoose = require('mongoose');


const passengerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  profileImage: { type: String ,default: '' },
});

const User = mongoose.model('Passenger', passengerSchema);

module.exports = User;
