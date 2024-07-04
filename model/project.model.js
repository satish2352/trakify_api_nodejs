const mongoose = require("mongoose");
const db = require("../config/db");
const teamUser = require("../model/teamUser.model");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  state: {
    type: String,
  },
  createdWings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wings",
    },
  ],
  teamMembers: {
    type: [teamUser.teamUserSchema],
    default: [],
  },
});

const ProjectModel = db.model("Project", projectSchema);

module.exports = ProjectModel;
