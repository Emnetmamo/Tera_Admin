const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define the route for admTransport Employee in login
router.post('/login', authController.loginTransportEmployee);

module.exports = router;
