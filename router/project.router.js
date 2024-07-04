const express = require("express");
const router = express.Router();
const project = require("../controller/project.controller");

router.get("/m_projectList", async (req, res) => {
  try {
    const userId = req.query._id;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, error: "User ID is required" });
    }

    const projects = await project.getProjectsByUser(userId);

    res.status(200).json({ success: true, projects });
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/m_projectDetails", async (req, res) => {
  try {
    const projectId = req.query.project_id;

    const projectDetails = await project.getProjectDetails(projectId);

    res.status(200).json({ project: projectDetails });
  } catch (error) {
    console.error("Error fetching project details:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
