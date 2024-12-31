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





// const express = require("express");
// const BusModel = require("../models/bus.model");

// const app = express.Router();

// // Route to get all cities
// app.get("/", async (req, res) => {
//   try {
//     const data = await BusModel.find({});
//     return res.send({ status: "success", data: data });
//   } catch (error) {
//     return res.status(500).send({ status: "failed", data: error.message });
//   }
// });

// // Get the bus by its id
// app.get("/:id", async (req, res) => {
//   try {
//     let bus = await BusModel.findById(req.params.id);
//     // If no bus is found, return an error message
//     if (!bus) {
//       return res.status(404).send({ status: "failed", data: "Bus not found" });
//     }
//     return res.send({ status: "success", data: bus });
//   } catch (error) {
//     // Return any errors that occur
//     return res.status(500).send({ status: "failed", data: error.message });
//   }
// });

// //Add the bus
// app.post("/", async (req, res) => {
//   try {
//     let newbus = await BusModel.create({ ...req.body });
//     // console.log(newbus);
//     return res.send(newbus);
//   } catch (error) {
//     return res.send(error.message);
//   }
// });


//  // Get buses based on multiple filters
//  app.post("/busavaliable", async (req, res) => {
//   try {
//     let { from, to, date } = req.body;

//     // Check if 'from' and 'to' fields are provided
//     if (!from || !to) {
//       return res.status(400).send({
//         status: "failed",
//         data: "From and To are required",
//       });
//     }

//     // Check if the 'date' field is provided
//     if (!date) {
//       return res.status(400).send({
//         status: "failed",
//         data: "Date is required",
//       });
//     }

//     // Clean up and format the input data (trim any leading or trailing spaces)
//     let source =
//       from.trim().charAt(0).toUpperCase() + from.trim().slice(1).toLowerCase();
//     let destination =
//       to.trim().charAt(0).toUpperCase() + to.trim().slice(1).toLowerCase();

//     // Build the base query object with 'from', 'to', and 'date'
//     let query = {
//       from: { $regex: `^${source}$`, $options: "i" }, // Case-insensitive regex match for 'from'
//       to: { $regex: `^${destination}$`, $options: "i" }, // Case-insensitive regex match for 'to'
//       date: date, // Match buses available on the specific date
//     };

//     // Query the database for matching buses
//     let allBusses = await BusModel.find(query);

//     // If no buses are found
//     if (allBusses.length === 0) {
//       return res.status(404).send({
//         status: "failed",
//         data: "No buses found matching the given criteria",
//       });
//     }

//     // If buses are found, return them as data
//     return res.send({
//       status: "success",
//       data: allBusses, // Include the bus details in the response
//     });
//   } catch (error) {
//     // Log the error and send error response
//     console.error(error);
//     return res.status(500).send({
//       status: "failed",
//       data: error.message, // Include the error message in the response
//     });
//   }
// });


// // app.post("/busavaliable", async (req, res) => {
// //   try {
// //     let query = {};

// //     // Filter by source and destination
// //     if (req.body.from) {
// //       let sourceStr = req.body.from;
// //       let source = sourceStr.charAt(0).toUpperCase() + sourceStr.substr(1);
// //       query.from = source;
// //     }

// //     if (req.body.to) {
// //       let destinationStr = req.body.to;
// //       let destination =
// //         destinationStr.charAt(0).toUpperCase() + destinationStr.substr(1);
// //       query.to = destination;
// //     }

// //     // Filter by amenities: Ensure amenities is an array
// //     if (req.body.amenities) {
// //       // If amenities is a string, convert it to an array
// //       let amenities = Array.isArray(req.body.amenities)
// //         ? req.body.amenities
// //         : [req.body.amenities];
// //       query.amenities = { $all: amenities };  // Match all the amenities
// //     }

// //     // Filter by departure time (example: "2024-12-31T10:00:00Z")
// //     if (req.body.departure) {
// //       query.departure = { $gte: new Date(req.body.departure) }; // e.g., buses departing after a given time
// //     }

// //     // Filter by price range (e.g., { minPrice: 50, maxPrice: 100 })
// //     if (req.body.minPrice || req.body.maxPrice) {
// //       query.price = {};
// //       if (req.body.minPrice) query.price.$gte = req.body.minPrice;
// //       if (req.body.maxPrice) query.price.$lte = req.body.maxPrice;
// //     }

// //     // Filter by rating (e.g., buses with rating >= 4.5)
// //     if (req.body.rating) {
// //       query.rating = { $gte: req.body.rating };
// //     }

// //     // Find buses based on the query object
// //     let allBuses = await BusModel.find(query);

// //     // If no buses match the query, return a message
// //     if (allBuses.length === 0) {
// //       return res.status(404).send({
// //         status: "failed",
// //         data: "No buses found with the given filters",
// //       });
// //     }

// //     return res.send({ status: "success", data: allBuses });
// //   } catch (error) {
// //     return res.status(500).send({ status: "failed", data: error.message });
// //   }
// // });

// //Delete the bus
// app.delete("/:id", async (req, res) => {
//   try {
//     let bus = await BusModel.findByIdAndDelete(req.params.id);
//     // If no bus is found, return an error message
//     if (!bus) {
//       return res.status(404).send({ status: "failed", data: "Bus not found" });
//     }
//     return res.send({ status: "success" });
//   } catch (error) {
//     // Return any errors that occur
//     return res.status(500).send({ status: "failed", data: error.message });
//   }
// });

// module.exports = app;
