const mongoose = require("mongoose");
const db = require("../config/db");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA8cTn1-RRcQ_T4-cf40vYi4sjFEADIdog1TqwvXO3kw&s",
    },
    createdProjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  { timestamps: true }
);

const User = db.model("Users", userSchema);

module.exports = User;
