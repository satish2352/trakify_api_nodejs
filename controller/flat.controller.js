const Floor = require("../model/floor.model");
const Flat = require("../model/flat.model");
const HistoryModel = require("../model/history.model");
const { TeamUser } = require("../model/teamUser.model");
// getflat by floor id
const getFlatsByFloorId = async (req, res, next) => {
  const { floorId } = req.params;

  try {
    const floor = await Floor.findById(floorId);

    if (!floor) {
      return res.status(404).json({ message: "Floor not found" });
    }

    const flats = floor.createdFlats;

    res.status(200).json({ flats });
  } catch (error) {
    console.error("Error fetching flats by floor ID:", error);
    next(error);
  }
};

// get Flat details by flat ID

const getFlatById = async (req, res, next) => {
  const { floorId, flatId } = req.params;

  try {
    // Find the floor by ID
    const floor = await Floor.findById(floorId);

    if (!floor) {
      return res.status(404).json({ message: "Floor not found" });
    }

    // Find the flat within the floor
    const flat = floor.createdFlats.find(
      (flat) => flat._id.toString() === flatId
    );

    if (!flat) {
      return res.status(404).json({ message: "Flat not found" });
    }

    res.status(200).json({ flat });
  } catch (error) {
    console.error("Error fetching flat by ID:", error);
    next(error);
  }
};

// Update flat details
const updateFlatStatusAndComment = async (req, res, next) => {
  const { floorId, flatId } = req.params;
  const { status, comment, userId, currentDate } = req.body;

  try {
    const user = await TeamUser.findById(userId);
    const floor = await Floor.findById(floorId);

    if (!floor) {
      return res.status(404).json({ message: "Floor not found" });
    }

    const flatIndex = floor.createdFlats.findIndex(
      (flat) => flat._id.toString() === flatId
    );

    if (flatIndex === -1) {
      return res.status(404).json({ message: "Flat not found" });
    }

    const historyEntry = new HistoryModel({
      flat_number: floor.createdFlats[flatIndex].flatNumber,
      oldState: floor.createdFlats[flatIndex].status,
      newState: status,
      updatedBy: user.name,
      comment: comment,
      flat_id: flatId,
      updatedOn: currentDate,
    });
    await historyEntry.save();

    const flat = floor.createdFlats[flatIndex];
    flat.status = status;
    flat.lastUpdated = currentDate;
    flat.comment = comment;

    await floor.save();

    res.status(200).json({ flat });
  } catch (error) {
    console.error("Error updating flat:", error);
    next(error);
  }
};

module.exports = {
  getFlatsByFloorId,
  getFlatById,
  updateFlatStatusAndComment,
};
