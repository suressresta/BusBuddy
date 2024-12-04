const express = require("express");
const BusModel = require("../models/bus.model");

const app = express.Router();

// Route to get all cities
app.get("/", async (req, res) => {
  try {
    const data = await BusModel.find({});
    res.send(data);
  } catch (error) {
    return res.status(500).send({ status: "failed", data: error.message });
  }
});

//Add the bus
app.post("/addnew", async (req, res) => {
  try {
    let newbus = await BusModel.create({ ...req.body });
    // console.log(newbus);
    return res.send(newbus);
  } catch (error) {
    return res.send(error.message);
  }
});

// Get if the bus is avaliable on the following date
app.post("/busavaliable", async (req, res) => {
  // console.log(req.body);
  try {
    let sourceStr = req.body.from;
    let destinationStr = req.body.to;
    let source = sourceStr.charAt(0).toUpperCase() + sourceStr.substr(1);
    let destination =
      destinationStr.charAt(0).toUpperCase() + destinationStr.substr(1);
    let allbusses = await BusModel.find({
      from: source,
      to: destination,
    });
    return res.send(allbusses);
  } catch (error) {
    return res.send(error.message);
  }
});

// Get the bus by its id
app.post("/one", async (req, res) => {
  try {
    let bus = await BusModel.find({ _id: req.body.id });
    return res.send(bus);
  } catch (error) {
    return res.send(error.message);
  }
});

module.exports = app;
