const express = require("express");
const categorySchema = require("../models/category.model");

const app = express.Router();

// Route to get all category
app.get("/", async (req, res) => {
  try {
    const data = await categorySchema.find({});
    return res.send({ status: "success", data: data });
  } catch (error) {
    return res.status(500).send({ status: "failed", data: error.message });
  }
});

// Category By ID
app.post("/id", async (req, res) => {
  const id = req.params.id;
  try {
    const category = await categorySchema.findById(id);
    return res.status(201).json(category);
  } catch (error) {
    return res.status(401).json(error.message);
  }
});

//Add the category
app.post("/", async (req, res) => {
  try {
    const category = await categorySchema.create({ ...req.body });
    // console.log(newbus);
    return res.status(201).json(category);
  } catch (error) {
    return res.status(401).json(error.message);
  }
});

//Delete the bus
app.delete("/:id", async (req, res) => {
  try {
    const data = await categorySchema.findByIdAndDelete(req.params.id);
    // If no category is found, return an error message
    if (!data) {
      return res
        .status(404)
        .send({ status: "failed", data: "Category not found" });
    }
    return res.send({ status: "success" });
  } catch (error) {
    F;
    // Return any errors that occur
    return res.status(500).send({ status: "failed", data: error.message });
  }
});

module.exports = app;
