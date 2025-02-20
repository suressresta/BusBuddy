const express = require("express");
const paymentModel = require("../models/payment.model");
const order = require("../models/order.model");
const { verifyEsewaPayment } = require("../middleware/esewa");

const app = express.Router();

app.get("/", async (req, res) => {
  try {
    const data = await paymentModel.find({}).sort({ _id: -1 });

    return res.send({ status: "success", data: data });
  } catch (error) {
    return res.status(500).send({ status: "failed", data: error.message });
  }
});

// Complete payment
app.get("/complete-payment", async (req, res) => {
  const { data } = req.query; // Data received from eSewa's redirect
  console.log("The sucess data are:", data);
  try {
    // Verify payment with eSewa
    const paymentInfo = await verifyEsewaPayment(data);
    console.log("The payment info", paymentInfo);
    // Find the purchased item using the transaction UUID

    const orderData = await order.findById(
      paymentInfo.decodedData.transaction_uuid
    );
    console.log("Order data found:", orderData); // Log the order data

    if (!orderData) {
      return res.status(500).json({
        success: false,
        message: "Order not found",
      });
    }

    // Create a new payment record in the database
    const paymentData = await paymentModel.create({
      pidx: paymentInfo.decodedData.transaction_code,
      transactionId: paymentInfo.decodedData.transaction_code,
      orderId: paymentInfo.decodedData.transaction_uuid,
      amount: orderData.totalAmount,
      dataFromVerificationReq: paymentInfo,
      apiQueryFromUser: req.query,
      paymentGateway: "esewa",
      status: "success",
    });

    // Update the purchased item status to 'completed'
    await order.findByIdAndUpdate(paymentInfo.decodedData.transaction_uuid, {
      $set: { status: "confirmed" },
    });
    // Respond with success message
    res.json({
      success: true,
      message: "Payment successful",
      paymentData,
    });
  } catch (error) {
    console.log("The error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during payment verification",
      error: error.message,
    });
  }
});

// Delete all payments
app.delete("/delete", async (req, res) => {
  try {
    // Delete all payment records from the database
    const result = await paymentModel.deleteMany({});

    // Return success message
    res.json({
      success: true,
      message: `${result.deletedCount} payment records deleted.`,
    });
  } catch (error) {
    console.error("Error deleting payments:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting payments",
      error: error.message,
    });
  }
});

module.exports = app;
