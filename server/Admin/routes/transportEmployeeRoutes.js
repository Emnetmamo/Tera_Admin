//routes/transportEmployeeRoutes.js

const express = require('express');
const router = express.Router();
const transportEmployeeController = require('../controllers/transportEmployeeController');

// transport EmployeeRoutes registration route
router.post('/register', transportEmployeeController.registerTransportEmployees);
router.put('/:id/activate', transportEmployeeController.activateTransportEmployee);
router.put('/:id/deactivate', transportEmployeeController.deactivateTransportEmployee);
router.get('/active', transportEmployeeController.getActiveAccounts);
router.get('/deactivated', transportEmployeeController.getDeactivatedAccounts);


module.exports = router;
