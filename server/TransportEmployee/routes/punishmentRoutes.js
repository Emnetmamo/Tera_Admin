// routes/punishmentRoutes.js
const express = require('express');
const router = express.Router();
const punishmentController = require('../controllers/punishmentController');

// Route to get assigned drivers form an employee
router.get('/DriversData/:userId', punishmentController.getDriversData);
// Route to post the punishment form to be sent as a reciet 
router.post('/punishmentForm', punishmentController.issuePunishment);
// Route to get all punishments
router.get('/punishments/:driverId', punishmentController.getpunishments);

module.exports =router;