const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const busSchema = new Schema({
  companyName: { type: String, required: true },
  totalSeat: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  amenities: { type: [String] },
  rating: { type: Number, required: true },
});

module.exports = mongoose.model("Bus", busSchema);
