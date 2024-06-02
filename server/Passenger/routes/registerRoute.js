const express = require('express');
const multer = require('multer');
const path = require('path');
const registerController = require('../controller/registerController');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Passenger/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post('/register', upload.single('profileImage'), registerController.registerPassenger);

module.exports = router;
