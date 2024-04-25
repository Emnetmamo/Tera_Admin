const multer = require('multer');
const bcrypt = require('bcrypt');
const driver = require('../model/drivermodel');
const jwt = require('jsonwebtoken');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Driver/ProfilePhoto/'); 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); 
  },
});

const upload = multer({ storage: storage });

const getDriverProfile = async (req, res) => {
  try {
    const userId = req.params.userId; // Extract userId from request parameters
    const userProfile = await driver.findById(userId);

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
    if (req.body.firstName) updateObject.firstName = req.body.firstName;
    if (req.body.lastName) updateObject.lastName = req.body.lastName;
    if (req.body.licenseplate) updateObject.phoneNumber = req.body.licenseplate;
    if (req.body.email) updateObject.address = req.body.email;

    if (req.file) {
      // Update the photoUpload field with the path to the uploaded file
      updateObject.photoUpload = req.file.path;
    }

    const updatedProfile = await driver.findByIdAndUpdate(
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

const changePassword = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { oldPassword, newPassword } = req.body;

    const user = await driver.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ error: 'Old password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getDriverProfile, updateProfile, changePassword, upload };
