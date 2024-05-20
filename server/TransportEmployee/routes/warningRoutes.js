// warningRoutes.js

const express = require('express');
const router = express.Router();
const { sendWarning, getDriversToBeWarned,getWarnings } = require('../controllers/warningController');

router.post('/sendWarning', sendWarning);
router.get('/driversToBeWarned', getDriversToBeWarned);
router.get('/warnings/:driverId', getWarnings);

module.exports = router;
