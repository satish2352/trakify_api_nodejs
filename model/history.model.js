const mongoose = require("mongoose");
const db = require("../config/db");

const historySchema = new mongoose.Schema({
  flat_number: {
    type: String,
    required: true,
  },
  flat_id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  oldState: {
    type: String,
    required: true,
  },
  newState: {
    type: String,
    required: true,
  },
  updatedOn: {
    type: String,
    required: true,
  },
  updatedBy: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
});

const HistoryModel = db.model("FlatHistory", historySchema);

module.exports = HistoryModel;
