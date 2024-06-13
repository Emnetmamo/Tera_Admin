const mongoose=require('mongoose');

const paymentSchema = mongoose.Schema(
  {
    punishmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Punishment",
      required: true,
    },
    punishmentName: { type: String, required: true },
    punishmentPrice: { type: Number, required: true },
    driverName: { type: String },
    txRef: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Payment =mongoose.model("Payments", paymentSchema);
module.exports =Payment;