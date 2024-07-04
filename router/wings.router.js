const express = require("express");
const router = express.Router();
const {
  getWingsByProject,
  getWingDetails,
  createWing,
} = require("../controller/wings.controller");

router.get("/m_wingList", async (req, res) => {
  try {
    const { project_id } = req.query;

    const wings = await getWingsByProject(project_id);

    res.status(200).json({ wings });
  } catch (error) {
    console.error("Error fetching wings:", error.message);
    res.status(500).json({ error: error.message });
  }
});
router.get("/m_wing", async (req, res) => {
  try {
    const { wing_id } = req.query;

    const wing = await getWingDetails(wing_id);

    res.status(200).json({ wing });
  } catch (error) {
    console.error("Error fetching wings:", error.message);
    res.status(500).json({ error: error.message });
  }
});

router.post("/m_createWing", createWing);

module.exports = router;
