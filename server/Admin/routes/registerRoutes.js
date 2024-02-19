const express = require('express');
const router = express.Router();
const adminController = require('../controllers/registerController');

//  route for admin registration
router.post('/register', adminController.registerAdmin);

// = route for checking existing username or email
router.get('/check-existing', adminController.checkExistingUser);

module.exports = router;
