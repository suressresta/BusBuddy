const express = require("express");
const BusModel = require("../models/bus.model");
const order = require("../models/order.model");

const Order = require("../models/order.model");
const moment = require("moment");
const app = express.Router();


app.post("/", async (req, res) => {
  try {
    // Step 1: Find the bus details by its ID
    const busId = req.body.bus;

    // Fetch the bus details from the BusModel collection
    const busDetails = await BusModel.findById(busId);

    if (!busDetails) {
      return res.status(404).json({ message: "Bus not found!" });
    }

    // Step 2: Automatically fill in the bus details in the order
    const orderData = {
      ...req.body, // Include all the order data from the request body
      busDetails: {
        date: busDetails.date,
        name: busDetails.companyname, // Ensure this matches the bus model field
        from: busDetails.from,
        to: busDetails.to,
        contactemail: busDetails.email, // Ensure this matches the bus model field
        contactphone: busDetails.phone, // Ensure this matches the bus model field
        arrival: busDetails.arrival,
        departure: busDetails.departure,
      },
      bus: busId, // Add the busId to the order
    };

    // Step 3: Create a new order document
    const newOrder = await Order.create(orderData);

    // Step 4: Prepare ticket data and update the bus seat availability
    let ticketdata =
      req.body.ticketSummary.date +
      "@" +
      req.body.ticketSummary.ticket +
      "@" +
      req.body.userDetails.gender;

    let filter = { _id: busId };
    let update = { $push: { seats: ticketdata } };

    // Update the bus with the new ticket data (push to seats array)
    await BusModel.findOneAndUpdate(filter, update);

    // Step 5: Return the created order with busDetails but only once
    return res.status(201).json({
      order: newOrder, // Return the created order
      busDetails: newOrder.busDetails, // Send the bus details directly from the order
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
});

app.post("/myticket", async (req, res) => {
  try {
    const order = await Order.find({ user: req.body.id });
    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
});

app.delete("/oneorder/:id", async (req, res) => {
  let id = req.params.id.split(":")[1];
  // console.log(id);
  try {
    const order = await Order.findOneAndDelete({ user: id });
    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
});

app.post("/myticket/today", async (req, res) => {
  // console.log("hi", req.body);
  const date = JSON.stringify(new Date()).split("T")[0].split('"')[1];
  // console.log("bye", date);
  try {
    const order = await Order.find();
    // console.log(order);
    let data = order.filter((ele) => {
      let orderDate = JSON.stringify(ele.ticketSummary.date)
        .split("T")[0]
        .split('"')[1];
      if (orderDate === date) {
        return ele;
      }
    });
    // console.log(data);
    return res.status(201).json(data);
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
});

app.post("/myticket/upcoming", async (req, res) => {
  const currentDate = new Date();
  try {
    const order = await Order.find({
      "ticketSummary.date": { $gt: new Date(currentDate) },
    });
    // console.log("checking upcoming");
    // console.log(order);
    return res.status(201).json(order);
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
});

app.post("/myticket/past", async (req, res) => {
  const currentDate = JSON.stringify(new Date()).split("T")[0].split('"')[1];
  try {
    const order = await Order.find({
      "ticketSummary.date": { $lt: new Date(currentDate) },
    });
    // console.log("checking past");
    // console.log(order);
    return res.status(201).json(order);
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
});

module.exports = app;
