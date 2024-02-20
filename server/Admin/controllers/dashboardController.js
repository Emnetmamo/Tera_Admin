//dashboardController.js

const Admin = require('../models/Admin');

const getDashboardData = async (req, res) => {
  try {
    const userId = req.params.userId; // Retrieve userId from the route params

    // Fetch user details from the database using userId
    const user = await Admin.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return user details for the dashboard
    res.status(200).json({
      firstName: user.firstName,
      lastName: user.fatherName,
      department: user.department,
      city: user.city,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profileImage: user.photoUpload, 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getDashboardData };