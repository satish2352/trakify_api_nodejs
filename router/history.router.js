const express = require("express");
const router = express.Router();
const { getFlatHistory } = require("../controller/history.controller");

router.get("/m_readHistory/:flatId", getFlatHistory);

module.exports = router;
