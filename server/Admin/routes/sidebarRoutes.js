// Import necessary modules and dependencies
const express = require('express');
const router = express.Router();
const sidebarController = require('../controllers/sidebarController');

// user detail routes with user ID parameter
router.get('/user-details/:userId', sidebarController.getUserDetails);

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 904cbe449a1c86518a9e9b6734eff50270b42c95
