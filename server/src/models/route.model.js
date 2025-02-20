const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const routeSchema = new Schema({
  date: { type: Date, required: true },
  bus: { type: Schema.Types.ObjectId, ref: "Bus" },
  from: { type: String, required: true },
  to: { type: String, required: true },
  arrival: { type: String, required: true },
  departure: { type: String, required: true },
  price: { type: Number, required: true },
  totalSeat: { type: Number },
  avaliableSeat: { type: Number },
});

module.exports = mongoose.model("route", routeSchema);
