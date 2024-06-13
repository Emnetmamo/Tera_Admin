const axios = require('axios');
const punishmentCollection = require('../../TransportEmployee/model/punishment');
const paymentcollection = require('../model/paymentmodel');
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

// Import broadcast function
const { broadcast } = require('../../server'); // Adjust the path as necessary

const createPayment = async (req, res) => {
  try {
    const { punishmentId } = req.body;
    console.log("Punishment Id: ", punishmentId);
    
    if (!punishmentId) {
      return res.status(400).json({ msg: "punishmentId is required" });
    }
    
    const punishment = await punishmentCollection.findById(punishmentId);
    if (!punishment) {
      return res.status(404).json({ msg: "Punishment not found" });
    }

    const { nanoid } = await import('nanoid');
    const txRef = nanoid();
    const order = {
      punishmentId: punishment._id,
      punishmentName: punishment.punishmentType,
      punishmentPrice: punishment.fine,
      driverName: punishment.driverName,
      txRef: txRef,
    };

    await paymentcollection.create(order);

    let chapaRequestData = {
      amount: punishment.fine,
      tx_ref: txRef,
      currency: "ETB",
    };

    const response = await axios.post(
      `https://api.chapa.co/v1/transaction/mobile-initialize`,
      chapaRequestData,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status === "success") {
      return res.json({
        msg: "Order created successfully. Perform payment.",
        paymentUrl: response.data.data.checkout_url,
      });
    } else {
      return res.status(500).json({ msg: "Something went wrong" });
    }
  } catch (error) {
    console.error("Error creating payment: ", error);
    if (error.response) {
      return res.status(500).json({ msg: error.response.data });
    } else {
      return res.status(500).json({ msg: error.message });
    }
  }
};

const verifyPayment = async (req, res) => {
  try {
    const hash = crypto
      .createHmac("sha256", process.env.CHAPA_WEBHOOK_SECRET)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (hash === req.headers["x-chapa-signature"]) {
      const event = req.body;
      const { tx_ref, status } = event;
      if (status === "success" && tx_ref) {
        const response = await axios.get(
          `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
          {
            headers: {
              Authorization: "Bearer " + process.env.CHAPA_API_KEY,
            },
          }
        );
      if (response.status === 200){
        if (response.data["status"] === "success") {
          let tx_ref = response.data["data"]["tx_ref"];
          const order = await paymentcollection.findOne({ txRef: tx_ref });

          if (!order || !order.paymentStatus != "pending") {
            return res.sendStatus(200);
          }
          if(order.paymentStatus === "pending"){
            order.paymentStatus = "completed";
            await order.save();
            
            // Notify clients about the payment status change
            return res.sendStatus(200);
          }
        }
      }
    }
    }
  } catch (err) {
    console.error("Error verifying payment: ", err);
    return res.status(500).json({ msg: err.message });
  }
};

const getPendingPayments = async (req, res) => {
  try {
    const pendingPayments = await paymentcollection.find({ paymentStatus: "pending" });
    res.json(pendingPayments);
  } catch (error) {
    console.error("Error fetching pending payments: ", error);
    res.status(500).json({ msg: error.message });
  }
};

const getCompletedPayments = async (req, res) => {
  try {
    const completedPayments = await paymentcollection.find({ paymentStatus: "completed" });
    res.json(completedPayments);
  } catch (error) {
    console.error("Error fetching completed payments: ", error);
    res.status(500).json({ msg: error.message });
  }
};



module.exports = { createPayment, verifyPayment, getPendingPayments, getCompletedPayments };
