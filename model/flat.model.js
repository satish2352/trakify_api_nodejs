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
    type: String,
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
    type: String,
  },
  // updatedBy: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
});

const flatModel = db.model("Flats", flatSchema);
module.exports = flatModel;
