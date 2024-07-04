const mongoose = require("mongoose");
const db = require("../config/db");
const flatSchema = new mongoose.Schema({
  flatNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "booked", "blocked", "hold"],
    default: "available",
  },
  bhk: {
    type: Number,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  addInfo: {
    type: String,
  },
  comment: {
    type: String,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const floorSchema = new mongoose.Schema({
  floorNumber: {
    type: Number,
    required: true,
  },
  numberOfFlats: {
    type: Number,
    required: true,
  },
  createdFlats: {
    type: [flatSchema],
    default: [],
  },
});

const floorModel = db.model("Floors", floorSchema);

module.exports = floorModel;
