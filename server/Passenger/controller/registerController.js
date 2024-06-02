const Passenger = require('../models/Passengers');
const bcrypt = require('bcrypt');

const registerPassenger = async (req, res) => {
  try {
    const passengerData = req.body;

    // Check if username already exists
    const existingUsername = await Passenger.findOne({ username: passengerData.username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Check if email already exists
    const existingEmail = await Passenger.findOne({ email: passengerData.email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password before saving it to the database
    const saltRounds = 10;
    passengerData.password = await bcrypt.hash(passengerData.password, saltRounds);

    // Add file paths to passengerData if files are available
    if (req.file) {
      passengerData.profileImage = req.file.path; // Save the file path
    }

    const newPassenger = new Passenger(passengerData);
    await newPassenger.save();
    res.status(201).json({ message: 'Passenger registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  registerPassenger,
};
