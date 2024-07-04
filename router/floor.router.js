const express = require("express");
const router = express.Router();
const {
  createFloor,
  getFloorsByWingId,
  getFloorById,
} = require("../controller/floor.controller");

router.post("/m_createFloor/:floorId", createFloor);
router.get("/m_floorDetails/:floorId", getFloorById);
router.get("/m_floorList/:wingId", getFloorsByWingId);

module.exports = router;
