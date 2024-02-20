// Import necessary modules and dependencies
const express = require('express');
const router = express.Router();
const sidebarController = require('../controllers/sidebarController');

// user detail routes with user ID parameter
router.get('/user-details/:userId', sidebarController.getUserDetails);

module.exports = router;
