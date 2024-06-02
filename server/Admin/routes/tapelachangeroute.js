const express = require('express');
const router = express.Router();
const Tapelacontroller = require('../controllers/TapelaChangeController');

router.get('/getData',Tapelacontroller.getDrivers);
router.post('/updateRouteAndDistrict', Tapelacontroller.updateDriverRouteAndDistrict);

module.exports =router;