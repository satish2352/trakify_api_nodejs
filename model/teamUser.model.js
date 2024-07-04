const mongoose = require("mongoose");
const db = require("../config/db");

const teamUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    default: "",
  },
  assignedProjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});

const TeamUser = db.model("TeamMembers", teamUserSchema);

module.exports = { TeamUser, teamUserSchema };
