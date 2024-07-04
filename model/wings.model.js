const mongoose = require("mongoose");
const db = require("../config/db");
const Floor = require("./floor.model");

const wingSchema = new mongoose.Schema({
  wingName: {
    type: String,
    required: true,
  },
  numberOfFloors: {
    type: Number,
    required: true,
  },
  flatsPerFloor: {
    type: Number,
    required: true,
  },
  createdFloors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Floors",
    },
  ],
});
const WingsModel = db.model("Wings", wingSchema);

module.exports = WingsModel;
