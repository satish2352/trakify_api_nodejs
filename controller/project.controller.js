const Project = require("../model/project.model");
const Floor = require("../model/floor.model");
const { TeamUser } = require("../model/teamUser.model");

async function getProjectsByUser(userId) {
  try {
    const user = await TeamUser.findById(userId).populate("assignedProjects");

    if (!user) {
      console.error("User not found with userId:", userId);
      throw new Error("User not found");
    }

    if (!user.assignedProjects || user.assignedProjects.length === 0) {
      console.log("No assigned projects for user:", userId);
      return [];
    }

    const projects = await Project.find({ _id: { $in: user.assignedProjects } })
      .populate({
        path: "createdWings",
        populate: {
          path: "createdFloors",
          populate: {
            path: "createdFlats",
          },
        },
      })
      .populate("teamMembers");

    const projectsWithCounts = projects.map((project) => {
      const countsByStatus = {
        totalFlats: 0,
        bookedFlats: 0,
        availableFlats: 0,
        blockedFlats: 0,
        holdFlats: 0,
      };

      project.createdWings.forEach((wing) => {
        wing.createdFloors.forEach((floor) => {
          floor.createdFlats.forEach((flat) => {
            countsByStatus.totalFlats++;
            switch (flat.status) {
              case "booked":
                countsByStatus.bookedFlats++;
                break;
              case "available":
                countsByStatus.availableFlats++;
                break;
              case "blocked":
                countsByStatus.blockedFlats++;
                break;
              case "hold":
                countsByStatus.holdFlats++;
                break;
            }
          });
        });
      });

      return {
        _id: project._id,
        name: project.name,
        type: project.type,
        address: project.address,
        city: project.city,
        state: project.state,
        description: project.description,
        ...countsByStatus,
      };
    });

    return projectsWithCounts;
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    throw new Error("Error fetching projects");
  }
}

async function getProjectDetails(projectId) {
  try {
    const project = await Project.findById(projectId);

    if (!project) {
      throw new Error("Project not found");
    }

    return project;
  } catch (error) {
    console.error("Error fetching project details:", error.message);
    throw new Error("Error fetching project details");
  }
}

module.exports = { getProjectsByUser, getProjectDetails };
