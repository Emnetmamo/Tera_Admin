const axios=require('axios');
const punishmentCollection = require('../../TransportEmployee/model/punishment');
const paymentcollection = require('../model/paymentmodel');
const crypto=require('crypto');

const createPayment = async (req, res) => {
  try {
    const driverId  = req.body;
    if (!punishmentId) {
      return res.status(400).json({
        msg: "punishmentId is required",
      });
    }
    // fetching the product from our database
    const punishment = await punishmentCollection.findOne({ driverId: driverId });
    
    if (!punishment) {
      return res.status(404).json({
        msg: "Punishment not found",
      });
    }
    // txRef is a unique identifier that will be sent to chapa and later get used to verify the payment transaction
    const txRef = require('nanoid')();
    const order = {
      punishmentId: punishment.driverId,
      punishmentName: punishment.punishmentType,
      punishmentPrice: punishment.fine,
      txRef: txRef,
    };
    // creating our order
    await PaymentCollection.create(order);

    // building the chapa request with the necessary data's
    // note that additional fields can be set as well, like phoneNumber, email ...
    let chapaRequestData = {
      amount: punishment.fine,
      tx_ref: txRef,
      currency: "ETB",
    };

    // making a request to chapa server
    const response = await axios.post(
      `https://api.chapa.co/v1/transaction/mobile-initialize`,
      chapaRequestData,
      {
        headers: {
          Authorization: "Bearer " + process.env.CHAPA_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    // check if succesful
    if (response.data["status"] == "success") {
      return res.json({
        msg: "Order created successfully. Perform payment.",
        paymentUrl: response.data["data"]["checkout_url"],
      });
    } else {
      return res.status(500).json({
        msg: "Something went wrong",
      });
    }
  } catch (error) {
    if (error.response) {
      return res.status(500).json({
        msg: error.response.data,
      });
    } else {
      return res.status(500).json({
        msg: error,
      });
    }
  }
};

const verifyPayment = async (req, res) => {
    try {
      //validate that this was indeed sent by Chapa's server
      // this is where we use the Secret hash we saved in .env
      const hash = crypto
        .createHmac("sha256", process.env.CHAPA_WEBHOOK_SECRET)
        .update(JSON.stringify(req.body))
        .digest("hex");
      if (hash == req.headers["x-chapa-signature"]) {
        // Retrieve the request's body
        const event = req.body;
  
        const { tx_ref, status } = event;
        if (status == "success" && tx_ref) {
          // hit the verify endpoint to make sure a transaction with the given
          // tx_ref was successful
          const response = await axios.get(
            `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
  
            {
              headers: {
                Authorization: "Bearer " + process.env.CHAPA_KEY,
              },
            }
          );
          if (response.status == 200) {
            // if successful find the order
            if (response.data["status"] == "success") {
              let tx_ref = response.data["data"]["tx_ref"];
              const order = await OrderCollection.findOne({
                txRef: tx_ref,
              });
              // check if the order doesn't exist or payment status is not pending
              if (!order || order.paymentStatus != "pending") {
                // Return a response to acknowledge receipt of the event
                return res.sendStatus(200);
              }
              // change payment status to completed
              if (order.paymentStatus == "pending") {
                order.paymentStatus = "completed";
                await order.save();
                // Return a response to acknowledge receipt of the event
                return res.sendStatus(200);
              }
            }
          }
        }
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  };

  module.exports ={createPayment, verifyPayment};