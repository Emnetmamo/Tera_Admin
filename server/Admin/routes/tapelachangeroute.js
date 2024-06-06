const express = require('express');
const router = express.Router();
const TapelaController = require('../controllers/TapelaChangeController');

router.get('/getData', TapelaController.getDrivers);
router.post('/updateRouteAndDistrict', TapelaController.updateDriverTerminalAndRoute);
router.get('/employees', TapelaController.getEmployeesByTerminal);

module.exports = router;
