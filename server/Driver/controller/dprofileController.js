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

    // Fetch user from the database 
    const user = await driver.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Ensure oldPassword and user.password are defined
    if (!oldPassword || !user.password) {
      return res.status(400).json({ error: 'Invalid request. Missing password data' });
    }

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


const uploadProfilePicture = async (req, res) => {
  const { userId } = req.body;
  const picture = req.file.path;

  try {
    const driver = await Driver.findById(userId);
    if (!driver) {
      return res.status(404).json({ error: 'Driver not found' }); // Changed to json() method
    }

    driver.profilePicture = picture;
    await driver.save();

    return res.status(200).json({ message: 'Profile picture uploaded successfully' }); // Changed to json() method
  } catch (error) {
    return res.status(500).json({ error: 'Server error' }); // Changed to json() method
  }
};


module.exports = { getDriverProfile, updateProfile, changePassword, uploadProfilePicture, upload };
