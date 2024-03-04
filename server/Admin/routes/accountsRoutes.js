//routes/accountsRoutes.js


// Activates or Deactivates Transport Employees Accounts
const express = require('express');
const router = express.Router();
const accountsController = require('../controllers/accountsController');

router.put('/:id/activate', accountsController.activateTransportEmployee);
router.put('/:id/deactivate', accountsController.deactivateTransportEmployee);
router.get('/active', accountsController.getActiveAccounts);
router.get('/deactivated', accountsController.getDeactivatedAccounts);


module.exports = router;