const express = require('express');
const paymentcontroller = require('../controller/paymentcontroller');
const router = express.Router();

router.post("/punishment", paymentcontroller.createPunishment);

router.post("/verifyPayment", paymentcontroller.verifyPayment);

module.exports = router;