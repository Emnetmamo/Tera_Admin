// Import necessary modules and dependencies
const Admin = require('../models/Admin');

const getUserDetails = async (req, res) => {
  try {
    const userId = req.params.userId; // Get user ID from params

    // Fetch user details from the database
    const user = await Admin.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user details
    res.status(200).json({
      firstName: user.firstName,
      fatherName: user.fatherName,
      photoUpload: user.photoUpload,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getUserDetails };
