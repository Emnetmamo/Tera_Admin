const express = require('express');
const router = express.Router();
const profileController = require('../controller/dprofileController');

// Get Profile data route
router.get('/profileData/:userId', profileController.getDriverProfile);

// Update Profile data route with multer middleware for image upload
router.put('/UpdateProfileData/:userId', profileController.upload.single('photoUpload'), profileController.update6Profile);

// Change Password route
router.put('/changePassword/:userId', profileController.changePassword);


module.exports = router;