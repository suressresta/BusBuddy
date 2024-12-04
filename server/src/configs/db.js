// index.js or your main app file
require("dotenv").config(); // Load environment variables from .env file

const mongoose = require("mongoose");

let connect = () => {
  return mongoose.connect(process.env.MONGO_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connect;
