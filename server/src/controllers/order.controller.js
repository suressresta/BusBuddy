const express = require("express");
const BusModel = require("../models/bus.model");
const Order = require("../models/order.model");
const moment = require("moment");
const app = express.Router();

app.get("/", async (req, res) => {
  try {
    const data = await Order.find({});
    return res.send({ status: "success", data: data });
  } catch (error) {
    return res.status(500).send({ status: "failed", data: error.message });
  }
});

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

// app.post("/myticket", async (req, res) => {
//   try {
//     const order = await Order.find({ user: req.body.id });
//     return res.status(201).json(order);
//   } catch (error) {
//     return res.status(500).json({ message: "Internal server error!" });
//   }
// });

app.post("/myticket", async (req, res) => {
  try {
    // Ensure the request body has the userId
    const userId = req.body.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch orders filtered by userId
    const orders = await Order.find({ user: userId });

    // Check if orders were found
    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    // Return the orders
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
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
  const currentDate = new Date();
  const userId = req.body.id; // Ensure you pass the user ID in the request body

  // Set the time to the start of the day for today's comparison (00:00:00)
  currentDate.setHours(0, 0, 0, 0);

  try {
    // Find orders where the user ID matches and the ticket date is today
    const orders = await Order.find({
      user: userId, // Filter by the user ID
      "ticketSummary.date": {
        $gte: currentDate, // greater than or equal to today's date
        $lt: new Date(currentDate).setHours(23, 59, 59, 999), // less than the end of today (23:59:59)
      },
    });

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for today" });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
});


// app.post("/myticket/today", async (req, res) => {
//   // console.log("hi", req.body);
//   const date = JSON.stringify(new Date()).split("T")[0].split('"')[1];
//   // console.log("bye", date);
//   try {
//     const order = await Order.find();
//     // console.log(order);
//     let data = order.filter((ele) => {
//       let orderDate = JSON.stringify(ele.ticketSummary.date)
//         .split("T")[0]
//         .split('"')[1];
//       if (orderDate === date) {
//         return ele;
//       }
//     });
//     // console.log(data);
//     return res.status(201).json(data);
//   } catch (error) {
//     // console.log(error);
//     return res.status(500).json({ message: "Internal server error!" });
//   }
// });

app.post("/myticket/upcoming", async (req, res) => {
  const currentDate = new Date();
  const userId = req.body.id;

  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find orders for the specific user and where the ticket date is in the future
    const orders = await Order.find({
      user: userId, // filter by user ID
      "ticketSummary.date": { $gt: currentDate }, // filter by upcoming date
    });

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No upcoming orders found for this user" });
    }

    // Return the orders found
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
});

// app.post("/myticket/upcoming", async (req, res) => {
//   const currentDate = new Date();
//   try {
//     const order = await Order.find({
//       "ticketSummary.date": { $gt: new Date(currentDate) },
//     });
//     // console.log("checking upcoming");
//     // console.log(order);
//     return res.status(201).json(order);
//   } catch (error) {
//     // console.log(error);
//     return res.status(500).json({ message: "Internal server error!" });
//   }
// });

app.post("/myticket/past", async (req, res) => {
  const currentDate = new Date();
  const userId = req.body.id; // Assuming userId is passed in the request body

  try {
    // Validate userId is provided
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find orders for the specific user and where the ticket date is in the past
    const orders = await Order.find({
      user: userId, // filter by user ID
      "ticketSummary.date": { $lt: currentDate }, // filter by past date
    });

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No past orders found for this user" });
    }

    // Return the orders found
    return res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
});

// app.post("/myticket/past", async (req, res) => {
//   const currentDate = JSON.stringify(new Date()).split("T")[0].split('"')[1];
//   try {
//     const order = await Order.find({
//       "ticketSummary.date": { $lt: new Date(currentDate) },
//     });
//     // console.log("checking past");
//     // console.log(order);
//     return res.status(201).json(order);
//   } catch (error) {
//     // console.log(error);
//     return res.status(500).json({ message: "Internal server error!" });
//   }
// });

module.exports = app;
