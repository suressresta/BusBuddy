const { Schema, model } = require("mongoose");

const BusSchema = new Schema({
  companyname: String,
  from: String,
  to: String,
  price: Number,
  email: String,
  phone: Number,
  amenities: [String], // Change 'aminities' to 'amenities'
  rating: Number,
  arrival: String,
  departure: String,
  seats: [String], // Ensure the 'seats' field is an array of strings
});


const BusModel = model("busses", BusSchema);

module.exports = BusModel;
