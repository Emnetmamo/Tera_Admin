const express = require('express');
const router = express.Router();
const complaintReplyController = require('../controllers/complaintReplyController');


/// For Transport Employee

// Route to fetch all complaints form employees
router.get('/allTransportEmployeeComplaint', complaintReplyController.getAllComplaints);
// Update the reply in the databse to z new reply sent by the Admin
router.put('/reply/:complaintId', complaintReplyController.sendReply);

///For Passenger

// Route to fetch all complaints form passengers
router.get('/allPassengerComplaint', complaintReplyController.getPassengerComplaints);
// Update the reply in the databse to z new reply sent by the Admin
router.put('/replyPassenger/:complaintId', complaintReplyController.sendReplyForPassenger);

module.exports = router;
