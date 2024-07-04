const { TeamUser } = require("../model/teamUser.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ProjectModel = require("../model/project.model");

const signIn = async (req, res) => {
  try {
    const { contact } = req.body;
    if (!contact) {
      return res.status(400).json({
        success: false,
        id: null,
        name: null,
        message: "Mobile number is required.",
      });
    }

    const user = await TeamUser.findOne({ contact });

    if (!user) {
      return res.status(200).json({
        success: false,
        id: null,
        name: null,
        message: "User not found.",
      });
    }

    user.verified = true;
    await user.save();

    return res.status(200).json({
      success: true,
      id: user._id,
      name: user.name,
      message: "Login successful.",
    });
  } catch (error) {
    console.error("Error signing in:", error);
    return res.status(500).json({
      success: false,
      id: null,
      name: null,
      message: "Internal server error.",
    });
  }
};

const createTeamUser = async (req, res) => {
  try {
    const { name, email, role, mobileNumber, password, projectId } = req.body;

    if (!name || !email || !role || !mobileNumber || !password || !projectId) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const existingUser = await TeamUser.findOne({ mobileNumber });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this mobile number already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new TeamUser({
      name,
      email,
      role,
      mobileNumber,
      password: hashedPassword,
    });
    await newUser.save();

    const project = await ProjectModel.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: "Project not found." });
    }

    project.teamMembers.push(newUser);
    await project.save();

    return res
      .status(200)
      .json({ message: "User created and appended to project successfully." });
  } catch (error) {
    console.error("Error creating user and appending to project:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  signIn,
  createTeamUser,
};
