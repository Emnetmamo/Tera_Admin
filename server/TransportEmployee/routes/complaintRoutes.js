const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');

// Route to submit a new complaint
router.post('/submit', complaintController.submitComplaint);

// Route to fetch all complaints for a specific employee
router.get('/all/:userId', complaintController.getAllComplaints);

module.exports = router;
