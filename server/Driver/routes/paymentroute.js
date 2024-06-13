const express = require('express');
const paymentcontroller = require('../controller/paymentcontroller');
const Payment=require('../model/paymentmodel');
const router = express.Router();

router.post("/punishment", paymentcontroller.createPayment);

router.post("/verifyPayment", paymentcontroller.verifyPayment);

router.get('/pending-payments', paymentcontroller.getPendingPayments);

router.get('/completed-payments', paymentcontroller.getCompletedPayments);

router.post('/update-payment-status', async (req, res) => {
    const { txRef } = req.body;
    try {
      const payment = await Payment.findOne({ txRef });
      if (payment) {
        payment.paymentStatus = 'completed';
        await payment.save();
        res.status(200).json({ message: 'Payment status updated successfully' });
      } else {
        res.status(404).json({ message: 'Payment not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating payment status', error });
    }
  });

module.exports = router;