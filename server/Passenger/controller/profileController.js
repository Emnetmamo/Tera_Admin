// controllers/profileController.js

const Passenger = require('../models/Passengers');

// Controller function to fetch user profile by ID
const getProfileById = async (req, res) => {
  try {
    // Retrieve user ID from request parameters
    const { userId } = req.params;

    // Fetch user profile from the database based on the user ID
    const userProfile = await Passenger.findById(userId);

    if (!userProfile) {
      // If profile not found, return 404 Not Found status
      return res.status(404).json({ message: 'Profile not found' });
    }

    // If profile found, return it in the response
    res.status(200).json(userProfile);
  } catch (error) {
    // If an error occurs, return 500 Internal Server Error status
    console.error('Error fetching passenger profile:', error);
    res.status(500).json({ message: 'Internal Server Error' });
    }
    };
    
    module.exports = {
    getProfileById
    };