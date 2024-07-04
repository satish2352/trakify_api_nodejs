const express = require("express");
const router = express.Router();
const {
  getUserByEmailAndPassword,
} = require("../controller/adminUser.controller");

router.get("/m_userDetails", async (req, res) => {
  try {
    const { email, password } = req.query;

    const user = await getUserByEmailAndPassword(email, password);

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
