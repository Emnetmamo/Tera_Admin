const express = require('express');
const router = express.Router();
const PassengerComplaintController = require('../controller/PassengerComplaintController');

// File a complaint
router.post('/fileComplaint', PassengerComplaintController.fileComplaint);

// Get all complaints
router.get('/', PassengerComplaintController.getComplaints);

module.exports = router;
