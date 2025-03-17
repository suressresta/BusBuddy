const express = require("express");
const routeModel = require("../models/route.model");
const BusModel = require("../models/bus.model");

const app = express.Router();

// Route to get all bus
app.get("/", async (req, res) => {
  try {
    const data = await routeModel.find({}).populate("bus").sort({ _id: -1 });
    return res.send({ status: "success", data: data });
  } catch (error) {
    return res.status(500).send({ status: "failed", data: error.message });
  }
});

// Bus by ID
app.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const route = await routeModel.findById(id).populate("bus");
    if (!route) {
      return res
        .status(404)
        .json({ status: "failed", message: "Route not found" });
    }
    return res.status(200).json({ status: "success", data: route });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Add the bus
app.post("/", async (req, res) => {
  const { bus, date, from, to } = req.body;
  try {
    if (!bus || !date) {
      return res.status(400).json({ message: "Bus ID and date are required" });
    }
    if (from == to) {
      return res
        .status(400)
        .json({ message: "Same Destination cannot be valid." });
    }
    const existingRoute = await routeModel.findOne({
      bus: bus,
      date: date,
    });

    if (existingRoute) {
      return res
        .status(400)
        .json({ message: "Bus is already booked on this date" });
    }
    const busDetails = await BusModel.findById(bus);

    if (!busDetails) {
      return res.status(400).json({ message: "Bus is not found" });
    }
    const totalSeat = busDetails.totalSeat;

    const route = await routeModel.create({
      ...req.body,
      totalSeat: totalSeat,
      avaliableSeat: totalSeat,
    });
    return res.status(201).json({ status: "success", data: route });
  } catch (error) {
    return res.status(500).send({ status: "failed", data: error.message });
  }
});

// Route
// app.get("/busRoute", async (req, res) => {
//   const { from, to, date } = req.body;

//   try {
//     const route = await routeModel.find({ from, to, date }).populate("bus");

//     if (!route || route.length === 0) {
//       return res
//         .status(404)
//         .json({ status: "failed", message: "Route not found" });
//     }

//     return res.status(200).json({ status: "success", data: route });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// });

app.post("/busRoute", async (req, res) => {
  const { from, to, date } = req.body;

  // Validate that all query parameters are provided
  if (!from || !to || !date) {
    return res.status(400).json({
      status: "failed",
      message: "Missing required query parameters (from, to, date).",
    });
  }

  try {
    const routes = await routeModel
      .find({ from, to, date })
      .populate("bus")
      .exec();

    // If no routes are found, return a 404
    if (!routes || routes.length === 0) {
      return res.status(404).json({
        status: "failed",
        message: "No bus routes found for the provided cities and date.",
      });
    }

    // Return the matched routes as the response
    return res.status(200).json({
      status: "success",
      data: routes,
    });
  } catch (error) {
    console.error("Error fetching bus routes:", error.message);
    return res.status(500).json({
      status: "failed",
      message: "Internal server error. Please try again later.",
    });
  }
});

//Delete the bus
app.delete("/:id", async (req, res) => {
  try {
    let route = await routeModel.findByIdAndDelete(req.params.id);
    if (!route) {
      return res
        .status(404)
        .send({ status: "failed", data: "Route not found" });
    }
    return res.send({ status: "success" });
  } catch (error) {
    return res.status(500).send({ status: "failed", data: error.message });
  }
});

app.put("/:id", async (req, res) => {
  try {
    const data = await routeModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json({
      message: "Bus updated sucessfully",
      data: data,
    });
  } catch (error) {
    res.status(500).send("Error in updating route");
  }
});

module.exports = app;
