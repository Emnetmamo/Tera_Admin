const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { updateProfile, checkExistingUser,getAdminData } = require('../controllers/UserController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },

  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage: storage });


router.put('/profile/:userId', upload.single('photoUpload'),updateProfile);

// API endpoint for checking existing users

router.get('/adminData/:userId',getAdminData); // Change endpoint to match frontend

router.get('/check-existing', checkExistingUser);
module.exports = router;
