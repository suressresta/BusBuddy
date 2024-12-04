const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CityModel = mongoose.model("City", CitySchema);

module.exports = CityModel;
