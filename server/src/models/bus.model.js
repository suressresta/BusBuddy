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




// const mongoose = require("mongoose");
// const { Schema } = require("mongoose");
// const moment = require("moment");

// const busSchema = new Schema({
//   date: { type: Date, required: true },
//   companyname: { type: String, required: true },
//   from: { type: String, required: true },
//   to: { type: String, required: true },
//   price: { type: Number, required: true },
//   email: { type: String, required: true },
//   phone: { type: Number, required: true },
//   amenities: { type: [String], required: true },
//   rating: { type: Number, required: true },
//   arrival: { type: String, required: true },
//   departure: { type: String, required: true },
//   seats: { type: [String], required: true },
// });

// // Middleware to set arrival and departure times based on user input
// busSchema.pre("save", function (next) {
//   // Ensure the date is in proper format (YYYY-MM-DD)
//   if (this.date) {
//     const date = new Date(this.date);
//     this.date = date.toISOString().split("T")[0]; // Format date to YYYY-MM-DD
//   }

//   // Handle Arrival Time (custom or default)
//   if (this.arrival) {
//     // Check if arrival time is valid
//     if (!moment(this.arrival, "hh:mm A", true).isValid()) {
//       // If invalid, set a default time (e.g., 08:00 AM)
//       this.arrival = moment().set({ hour: 8, minute: 0, second: 0 }).format("YYYY-MM-DD hh:mm A");
//     } else {
//       // If valid, format it to the correct format
//       this.arrival = moment(this.arrival, "hh:mm A").format("YYYY-MM-DD hh:mm A");
//     }
//   } else {
//     // If no arrival time provided, set it to 08:00 AM
//     this.arrival = moment().set({ hour: 8, minute: 0, second: 0 }).format("YYYY-MM-DD hh:mm A");
//   }

//   // Handle Departure Time (custom or default)
//   if (this.departure) {
//     // Check if departure time is valid
//     if (!moment(this.departure, "hh:mm A", true).isValid()) {
//       // If invalid, set a default time (e.g., 08:30 AM)
//       this.departure = moment().set({ hour: 8, minute: 30, second: 0 }).format("YYYY-MM-DD hh:mm A");
//     } else {
//       // If valid, format it to the correct format
//       this.departure = moment(this.departure, "hh:mm A").format("YYYY-MM-DD hh:mm A");
//     }
//   } else {
//     // If no departure time provided, set it to 08:30 AM
//     this.departure = moment().set({ hour: 8, minute: 30, second: 0 }).format("YYYY-MM-DD hh:mm A");
//   }

//   next(); // Proceed to save the document
// });

// module.exports = mongoose.model("busses", busSchema);
