const Floor = require("../model/floor.model");
const { ObjectId } = require("mongodb");
const WingsModel = require("../model/wings.model");
const createFloor = async (req, res, next) => {
  const { floorId } = req.params;
  const flatsData = req.body;

  try {
    const floor = await Floor.findById(floorId);
    if (!floor) {
      return res.status(404).json({ message: "Floor not found" });
    }

    const flats = flatsData.flats.map((flatData) => {
      const flat = new Flat({
        flatNumber: flatData.flatNumber,
        status: flatData.status,
        bhk: flatData.bhk,
        area: flatData.area,
        price: flatData.price,
        addInfo: flatData.addInfo,
      });

      return flat;
    });

    floor.createdFlats = flats;
    await floor.save();

    res.status(201).json({
      message: "Floor updated successfully",
      currentFloor: floor,
    });
  } catch (error) {
    console.error("Error submitting floor:", error);
    next(error);
  }
};
// getFloorsByWingId

const getFloorsByWingId = async (req, res, next) => {
  const { wingId } = req.params;

  try {
    // Convert wingId string to ObjectId
    const wingObjectId = new ObjectId(wingId);

    // Find the wing document by its ObjectId
    const wing = await WingsModel.findById(wingObjectId);

    if (!wing) {
      return res
        .status(404)
        .json({ message: "Wing not found for the provided ID" });
    }

    // Extract the floor IDs from the wing document
    const floorIds = wing.createdFloors.map((id) => new ObjectId(id));

    // Find floors using the extracted floor IDs
    const floors = await Floor.find({ _id: { $in: floorIds } });

    if (!floors || floors.length === 0) {
      return res
        .status(404)
        .json({ message: "Floors not found for the provided wing ID" });
    }

    const modifiedFloors = floors.map((floor) => ({
      ...floor.toObject(),
      createdFlats: floor.createdFlats.map((flat) => ({
        _id: flat._id,
        flatNumber: flat.flatNumber,
        status: flat.status,
      })),
    }));

    res.status(200).json({ floors: modifiedFloors });
  } catch (error) {
    console.error("Error fetching floors by wing ID:", error);
    next(error);
  }
};

// get Floor Details by floor Id
const getFloorById = async (req, res, next) => {
  const { floorId } = req.params;

  try {
    // Find floor by the provided floor ID
    const floor = await Floor.findById(floorId);

    if (!floor) {
      return res.status(404).json({ message: "Floor not found" });
    }

    res.status(200).json({ floor });
  } catch (error) {
    console.error("Error fetching floor by ID:", error);
    next(error);
  }
};

module.exports = {
  createFloor,
  getFloorsByWingId,
  getFloorById,
};
