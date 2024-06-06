// routes/profileRoutes.js

const express = require('express');
const router = express.Router();
const profileController = require('../controller/profileController');

// Route to fetch user profile by ID
router.get('/profile/:userId', profileController.getProfileById);

module.exports = router;
