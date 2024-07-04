const Project = require("../model/project.model");
const Wing = require("../model/wings.model");

async function getWingsByProject(projectId) {
  try {
    const project = await Project.findById(projectId).populate("createdWings");
    if (!project) {
      throw new Error("Project not found");
    }
    const wings = project.createdWings;

    return wings;
  } catch (error) {
    console.error("Error fetching wings:", error.message);
    throw new Error("Error fetching wings");
  }
}

async function getWingDetails(wingId) {
  try {
    const wing = Wing.findById(wingId);
    if (!wing) {
      throw new Error("Wing not found");
    }
    return wing;
  } catch (e) {
    console.e("Error fetching details of wing:".e.message);
    throw new Error("Error fetching details of wing");
  }
}

const createWing = async (req, res, next) => {
  const { wingName, numberOfFloors, flatsPerFloor } = req.body;
  const projectId = req.params.id;

  try {
    const newWing = new Wing({
      wingName,
      numberOfFloors,
      flatsPerFloor,
    });

    await newWing.save();

    const createdFloors = [];
    for (let i = 1; i <= numberOfFloors; i++) {
      const newFloor = new Floor({
        floorNumber: i,
        numberOfFlats: flatsPerFloor,
        flats: [],
      });
      await newFloor.save();
      createdFloors.push(newFloor._id);
    }

    newWing.createdFloors = createdFloors;
    await newWing.save();

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    project.createdWings.push(newWing._id);
    await project.save();

    res.status(201).json({
      message: "Wing created successfully",
      currentWing: newWing,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { getWingsByProject, getWingDetails, createWing };
