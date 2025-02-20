const mongoose = require("mongoose");

const reqString = { type: String, required: true };

const orderSchema = new mongoose.Schema(
  {
    userDetails: {
      name: reqString,
      gender: reqString,
      phone: reqString,
      age: reqString,
      email: reqString,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    route: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "route",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "refunded"],
      default: "pending",
    },
    seatNumber: { type: [String], required: true },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, default: "esewa" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
