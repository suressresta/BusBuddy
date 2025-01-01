const express = require("express");
const BusModel = require("../models/bus.model");

const app = express.Router();

// Route to get all cities
app.get("/", async (req, res) => {
  try {
    const data = await BusModel.find({});
    return res.send({ status: "success", data: data });
  } catch (error) {
    return res.status(500).send({ status: "failed", data: error.message });
  }
});

app.post("/one", async (req, res) => {
  try {
    let bus = await BusModel.find({ _id: req.body.id });
    return res.send(bus);
  } catch (error) {
    return res.send(error.message);
  }
});

//Add the bus
app.post("/", async (req, res) => {
  try {
    let newbus = await BusModel.create({ ...req.body });
    // console.log(newbus);
    return res.send(newbus);
  } catch (error) {
    return res.send(error.message);
  }
});

// Get buses based on multiple filters
app.post("/busavaliable", async (req, res) => {
  try {
    let { from, to, date, amenities } = req.body;

    // Initialize query object
    let query = {};

    // Check if 'from' and 'to' fields are provided and format them
    if (from) {
      let source =
        from.trim().charAt(0).toUpperCase() +
        from.trim().slice(1).toLowerCase();
      query.from = { $regex: `^${source}$`, $options: "i" }; // Case-insensitive regex match
    }

    if (to) {
      let destination =
        to.trim().charAt(0).toUpperCase() + to.trim().slice(1).toLowerCase();
      query.to = { $regex: `^${destination}$`, $options: "i" }; // Case-insensitive regex match
    }

    // Check if 'date' is provided
    if (date) {
      query.date = date; // Exact match for date
    }

    // Check if 'amenities' is provided
    if (amenities && amenities.length > 0) {
      // If amenities are provided, we will check if buses have all of these amenities
      query.amenities = { $all: amenities }; // Match buses having all the specified amenities
    }

    // Query the database for matching buses
    let allBusses = await BusModel.find(query);

    // If no buses are found
    if (allBusses.length === 0) {
      return res.status(404).send({
        status: "failed",
        data: "No buses found matching the given criteria",
      });
    }

    // If buses are found, return them as data
    return res.send({
      status: "success",
      data: allBusses, // Include the bus details in the response
    });
  } catch (error) {
    // Log the error and send error response
    console.error(error);
    return res.status(500).send({
      status: "failed",
      data: error.message, // Include the error message in the response
    });
  }
});

//Delete the bus
app.delete("/:id", async (req, res) => {
  try {
    let bus = await BusModel.findByIdAndDelete(req.params.id);
    // If no bus is found, return an error message
    if (!bus) {
      return res.status(404).send({ status: "failed", data: "Bus not found" });
    }
    return res.send({ status: "success" });
  } catch (error) {
    // Return any errors that occur
    return res.status(500).send({ status: "failed", data: error.message });
  }
});

module.exports = app;
