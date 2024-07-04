const express = require("express");
const router = express.Router();
const {
  getFlatsByFloorId,
  getFlatById,
  updateFlatStatusAndComment,
} = require("../controller/flat.controller");

router.get("/m_flatList/:floorId", getFlatsByFloorId);
router.get("/m_flatDetails/:floorId/:flatId", getFlatById);
router.patch("/m_updateFlat/:floorId/:flatId", updateFlatStatusAndComment);

module.exports = router;
