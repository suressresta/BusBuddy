const express = require("express");
const routeModel = require("../models/route.model");
const userModel = require("../models/user.model");
const Order = require("../models/order.model");
const app = express.Router();
const { getEsewaPaymentHash } = require("../middleware/esewa");
const { v4: uuidv4 } = require("uuid");

// Get all
app.get("/", async (req, res) => {
  try {
    const data = await Order.find({})
      .sort({ _id: -1 })
      .populate("user")
      .populate({
        path: "route",
        populate: {
          path: "bus",
          model: "Bus",
        },
      });
    return res.send({ status: "success", data: data });
  } catch (error) {
    return res.status(500).send({ status: "failed", data: error.message });
  }
});

// Get Order by Id
app.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res
        .status(404)
        .json({ status: "failed", message: "order not found" });
    }
    return res.status(200).json({ status: "success", data: order });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//Add Order
app.post("/", async (req, res) => {
  try {
    const routeId = req.body.route;
    const userId = req.body.user;
    const seatNumber = req.body.seatNumber;
    // Fetch route and user details
    const routeDetail = await routeModel.findById(routeId);
    const userDetail = await userModel.findById(userId);

    if (!routeDetail) {
      return res.status(404).json({ message: "Route not found!" });
    }

    // Check if there are any available seats left
    if (routeDetail.avaliableSeat <= 0) {
      return res
        .status(400)
        .json({ message: "No available seats on this route!" });
    }

    const existingOrder = await Order.findOne({
      route: routeId,
      seatNumber: seatNumber,
    });

    if (existingOrder) {
      return res.status(400).json({ message: "Seat already taken!" });
    }

    const orderData = {
      ...req.body, // other all req
      routeDetail: {
        date: routeDetail.date,
        from: routeDetail.from,
        to: routeDetail.to,
        arrival: routeDetail.arrival,
        departure: routeDetail.departure,
      },
      userDetail: {
        email: userDetail.email,
      },
      seatNumber: seatNumber,
    };

    const newOrder = await Order.create(orderData);

    //Payment Initiate
    const paymentInitiate = await getEsewaPaymentHash({
      amount: newOrder.totalAmount,
      transaction_uuid: newOrder._id, // passing the id of new created order
    });

    await routeModel.findByIdAndUpdate(routeId, {
      $inc: { availableSeat: -1 },
    });

    //   Fetch the updated route details to reflect the change in available seats
    const updatedRouteDetail = await routeModel.findById(routeId);

    //  Return the created order with bus details and the remaining available seats
    return res.status(201).json({
      Payment: paymentInitiate,
      order: newOrder,
      remainingSeats: updatedRouteDetail.avaliableSeat,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
});

//Delete
app.delete("/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found!" });
    }
    return res.status(200).json({ message: "Order deleted sucessfully" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

//Update
app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { seatNumber, routeId, totalAmount } = req.body;
  try {
    if (isNaN(totalAmount)) {
      return res.status(400).json({ message: "Invalid totalAmount provided!" });
    }
    // Check if the seat is already taken
    const existingOrder = await Order.findOne({
      route: routeId,
      seatNumber: seatNumber,
    });

    if (existingOrder) {
      return res.status(400).json({ message: "Seat already taken!" });
    }
    const order = await Order.findById(id);

    const data = await Order.findByIdAndUpdate(id, req.body, { new: true });

    let amountDifference = Math.abs(totalAmount - order.totalAmount);
    const uniqueTransactionUUID = uuidv4();
    console.log("The uuid:", uniqueTransactionUUID);

    const paymentInitiate = await getEsewaPaymentHash({
      transaction_uuid: uniqueTransactionUUID,
      amount: amountDifference,
    });
    res.status(201).json({
      message: "Order updated successfully",
      data: data,
      Payment: paymentInitiate,
    });
  } catch (error) {
    console.error("Error in updating order:", error);
    res.status(500).send("Error in updating order");
  }
});

// Get Seat
app.get("/seat/:routeId", async (req, res) => {
  try {
    const routeId = req.params.routeId;
    const data = await Order.find({
      route: routeId,
      status: { $in: ["confirmed", "pending"] },
    });

    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this route" });
    }
    const bookedSeats = data.map((order) => ({
      userName: order.userDetails.name,
      number: order.userDetails.phone,
      seatNumber: order.seatNumber,
      totalAmount: order.totalAmount,
      status: order.status,
      registeredDate: order.createdAt,
    }));

    return res.status(200).json({
      status: 200,
      message: "Seats retrieved successfully",
      data: bookedSeats,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get order By Route ID
app.post("/route/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const orders = await Order.find({ route: id });

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ status: "failed", message: "No orders found for this route" });
    }

    return res.status(200).json({
      status: "success",
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

//Get by user Id
app.get("/myticket/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = await Order.find({ user: userId }).populate("route");

    if (!data || data.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    return res.status(200).json({
      status: 200,
      message: "Orders retrieved successfully",
      data: data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get Today Ticket
app.post("/myticket/today", async (req, res) => {
  const currentDate = new Date();
  const userId = req.body.userId;

  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch the orders for the given user and populate related route and bus information
    const orders = await Order.find({ user: userId }).populate({
      path: "route",
      populate: {
        path: "bus",
        model: "Bus",
      },
    });

    // Check if any orders were found for the user
    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    // Normalize current date to midnight (00:00:00) and avoid time zone issues
    currentDate.setHours(0, 0, 0, 0); // Reset time portion to midnight (start of the day)

    // Define the start and end of today
    const startOfDay = new Date(currentDate); // This is the 00:00:00 of today
    const endOfDay = new Date(currentDate);
    endOfDay.setHours(23, 59, 59, 999); // Set to the end of the day (23:59:59.999)

    // Filter orders for today by comparing the route date with the start and end of today
    const todayOrder = orders.filter((order) => {
      if (!order.route || !order.route.date) return false;

      const routeDate = new Date(order.route.date);

      // Check if the route date is within today
      return routeDate >= startOfDay && routeDate <= endOfDay;
    });

    // If no orders for today, return a 404 message
    if (todayOrder.length === 0) {
      return res.status(404).json({ message: "No orders found for today" });
    }

    // Return the orders for today
    return res.status(200).json({
      status: 200,
      message: "Today orders retrieved successfully",
      data: todayOrder,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
});

// Get Upcomming Ticket
app.post("/myticket/upcoming", async (req, res) => {
  const currentDate = new Date();
  const userId = req.body.userId;

  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const orders = await Order.find({ user: userId }).populate({
      path: "route",
      populate: {
        path: "bus",
        model: "Bus",
      },
    });
    // Check if orders were found
    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No upcoming orders found for this user" });
    }

    // Filter orders for Upcoming
    const upcommingOrders = orders.filter((order) => {
      if (!order.route || !order.route.date) return false;

      const routeDate = new Date(order.route.date);
      routeDate.setHours(0, 0, 0, 0);

      return routeDate.getTime() > currentDate.getTime();
    });

    if (upcommingOrders.length === 0) {
      return res.status(404).json({ message: "No upcomming orders found " });
    }

    return res.status(200).json({
      status: 200,
      message: "Upcomming Orders retrieved successfully",
      data: upcommingOrders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
});

// Get Past Ticket
app.post("/myticket/past", async (req, res) => {
  const currentDate = new Date();
  const userId = req.body.userId;

  try {
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Fetch the orders for the given user and populate related route and bus information
    const orders = await Order.find({ user: userId }).populate({
      path: "route",
      populate: {
        path: "bus",
        model: "Bus",
      },
    });

    // Check if any orders were found for the user
    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    // Normalize current date to midnight (00:00:00)
    currentDate.setHours(0, 0, 0, 0); // Set the current date to midnight to compare only the date part

    // Filter orders for past orders (those that happened before today)
    const pastOrders = orders.filter((order) => {
      if (!order.route || !order.route.date) return false;

      const routeDate = new Date(order.route.date);
      routeDate.setHours(0, 0, 0, 0); // Normalize route date to midnight (ignore time)

      return routeDate.getTime() < currentDate.getTime();
    });

    // If no past orders found, return a 404 message
    if (pastOrders.length === 0) {
      return res.status(404).json({ message: "No past orders found" });
    }

    // Return the past orders
    return res.status(200).json({
      status: 200,
      message: "Past Orders retrieved successfully",
      data: pastOrders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
});

module.exports = app;
