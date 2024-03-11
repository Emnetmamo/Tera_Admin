// controllers/profileController.js

const TransportEmployee = require('../../Admin/models/TransportEmployee');
const multer = require('multer');
const bcrypt = require('bcrypt');

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'TransportEmployee/uploads/'); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Keep the original file name
  },
});

const upload = multer({ storage: storage });

// fetch Employees Data to display 
const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId; // Extract userId from request parameters
    const userProfile = await TransportEmployee.findById(userId);

    if (!userProfile) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(userProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update the profile data 
const updateProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Construct the update object based on chnaged fields in the request body
    const updateObject = {};
    if (req.body.phoneNumber) updateObject.phoneNumber = req.body.phoneNumber;
    if (req.body.address) updateObject.address = req.body.address;
    if (req.body.username) updateObject.username = req.body.username;

    if (req.file) {
      // Update the photoUpload field with the path to the uploaded file
      updateObject.photoUpload = req.file.path; 
    }

    const updatedProfile = await TransportEmployee.findByIdAndUpdate(
      userId,
      updateObject,
      { new: true } // Return the updated document
    );

    if (!updatedProfile) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(updatedProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Change password
const changePassword = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { oldPassword, newPassword } = req.body;

    // Fetch user from the database 
    const user = await TransportEmployee.findById(userId);

    // Verify old password
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid old password' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password in the database
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getUserProfile, updateProfile, upload, changePassword };