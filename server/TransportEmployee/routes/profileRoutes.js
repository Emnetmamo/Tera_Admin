// routes/profileRoutes.js

const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

// Get Profile data route
router.get('/profileData/:userId', profileController.getUserProfile);

// Update Profile data route with multer middleware for image upload
router.put('/UpdateProfileData/:userId', profileController.upload.single('photoUpload'), profileController.updateProfile);

// Change Password route
router.put('/changePassword/:userId', profileController.changePassword);

module.exports = router;
