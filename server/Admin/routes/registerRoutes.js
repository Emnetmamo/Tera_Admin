const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { registerAdmin, checkExistingUser } = require('../controllers/registerController');

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },

  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname)); 
  },
});



const upload = multer({ storage: storage }).fields([
  { name: 'idUpload', maxCount: 1 },
  { name: 'photoUpload', maxCount: 1 },
]);



// API endpoint for admin registration with file uploads
router.post('/register', upload, registerAdmin);

// API endpoint for checking existing users
router.get('/check-existing', checkExistingUser);

module.exports = router;
