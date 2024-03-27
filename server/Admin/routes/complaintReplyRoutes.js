const express = require('express');
const router = express.Router();
const complaintReplyController = require('../controllers/complaintReplyController');


// Route to fetch all complaints form employees
router.get('/allTransportEmployeeComplaint', complaintReplyController.getAllComplaints);
// Update the reply in the databse to z new reply sent by the Admin
router.put('/reply/:complaintId', complaintReplyController.sendReply);
module.exports = router;
