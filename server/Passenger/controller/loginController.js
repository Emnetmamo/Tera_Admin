// loginController.js

const Passenger = require('../models/Passengers');
const bcrypt = require('bcrypt');

const loginPassenger = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the passenger by username
    const passenger = await Passenger.findOne({ username });

    // If passenger doesn't exist or password doesn't match, send error response
    if (!passenger || !(await bcrypt.compare(password, passenger.password))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Successful login, respond with passenger ID (_id)
    res.status(200).json({ message: 'Login successful', passengerId: passenger._id });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  loginPassenger,
};
