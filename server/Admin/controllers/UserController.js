
const User = require('../models/Admin'); 
const multer = require('multer');
const bcrypt = require('bcrypt');
const updateProfile = async (req, res) => {
  try {
    const userId = req.params.userId || req.body.userId; // Handle both cases
    if (!userId) {
      return res.status(400).json({ message: "Missing user ID" });
    }

    const updatedData = req.body; // Access updated data

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating profile" });
  }
};
const checkExistingUser = async (req, res) => {
    try {
      const { field, value } = req.query;
      const existingUser = await Admin.findOne({ [field]: value });
  
      res.json({ exists: !!existingUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  const getAdminData = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      if (!userId) {
        return res.status(400).json({ message: 'Missing user ID' });
      }
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({
        firstName: user.firstName,
        lastName: user.fatherName,
        grandfatherName: user.grandfatherName,
        department: user.department,
        city: user.city,
        email: user.email,
        username: user.username,
        phoneNumber: user.phoneNumber,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  module.exports = { updateProfile, checkExistingUser, getAdminData };