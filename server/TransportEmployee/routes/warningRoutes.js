// warningRoutes.js

const express = require('express');
const router = express.Router();
const { sendWarning, getDriversToBeWarned } = require('../controllers/warningController');

router.post('/sendWarning', sendWarning);
router.get('/driversToBeWarned', getDriversToBeWarned);

module.exports = router;
