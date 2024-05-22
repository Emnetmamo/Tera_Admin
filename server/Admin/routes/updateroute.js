const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { updateProfile, checkExistingUser, getAdminData } = require('../controllers/UserController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get('/adminData/:userId', getAdminData);
router.get('/check-existing', checkExistingUser);
router.put('/profile/:userId', upload.single('photoUpload'), updateProfile);

module.exports = router;
