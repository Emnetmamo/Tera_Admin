//routes/supervisorRoutes.js

const express = require('express');
const router = express.Router();
const supervisorController = require('../controllers/supervisorController');

// Supervisor registration route
router.post('/register', supervisorController.registerSupervisor);

module.exports = router;
