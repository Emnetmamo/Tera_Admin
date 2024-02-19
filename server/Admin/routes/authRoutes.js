const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define the route for admin login
router.post('/login', authController.loginAdmin);

module.exports = router;
