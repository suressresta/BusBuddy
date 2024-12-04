const express = require("express");
const CityModel = require("../models/city.model");

const app = express.Router();

// Route to get all cities
app.get("/", async (req, res) => {
  try {
    const data = await CityModel.find({});
    res.send(data);
  } catch (error) {
    return res.status(500).send({ status: "failed", data: error.message });
  }
});

// Route to add a new city
app.post("/add", async (req, res) => {
  try {
    const { name, state } = req.body;

    // Check if the city already exists
    let existingCity = await CityModel.findOne({ name: name });
    if (existingCity) {
      return res
        .status(400)
        .send({ status: "failed", data: "City already exists" });
    }
    // Create a new city object
    const newCity = new CityModel({
      name,
      state,
    });

    // Save the new city to the database
    await newCity.save();

    return res.send({ status: "success", data: "City added successfully" });
  } catch (error) {
    return res.status(500).send({ status: "failed", data: error.message });
  }
});


// Route to search single cities based on 'destination' or 'source'
app.post("/", async (req, res) => {
  try {
    let q;
    // Check if 'destination' or 'source' is provided in the request body
    if (req.body.destination) {
      q = req.body.destination;
    } else if (req.body.source) {
      q = req.body.source;
    } else {
      return res
        .status(400)
        .send({ status: "failed", data: "source or destination is required" });
    }

    // Convert the search term to uppercase for case-insensitive matching
    q = q.toUpperCase();

    // Fetch all cities and filter them based on the search term
    let data = await CityModel.find();
    let city = data.filter((ele) => {
      return ele.name.toUpperCase().includes(q);
    });

    // Return the filtered cities
    return res.send(city);
  } catch (error) {
    // If there's an error, send a 500 status code with the error message
    return res.status(500).send({ status: "failed", data: error.message });
  }
});

// Route to check if both source and destination cities exist
app.post("/showcity", async (req, res) => {
  let sourceStr = req.body.source;
  let destinationStr = req.body.destination;

  // Capitalize the first letter of the source and destination
  let source = sourceStr.charAt(0).toUpperCase() + sourceStr.substr(1);
  let destination =
    destinationStr.charAt(0).toUpperCase() + destinationStr.substr(1);

  try {
    // Find the source and destination cities in the database
    let fromcheck = await CityModel.findOne({ name: source });
    let destinationcheck = await CityModel.findOne({ name: destination });

    // If both cities are found, return success message
    if (fromcheck) {
      if (destinationcheck) {
        return res.send({
          status: "success",
          data: "Buses In Your City Are Here",
        });
      } else {
        // If destination city is not found
        return res.send({ status: "failed", data: "destination is not found" });
      }
    } else {
      // If source city is not found
      return res.send({ status: "failed", data: "source is not found" });
    }
  } catch (error) {
    // If there's an error, send the error message
    return res.status(500).send({ status: "failed", data: error.message });
  }
});

module.exports = app;
