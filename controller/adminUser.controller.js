const User = require("../model/adminUser.model");

async function getUserByEmailAndPassword(email, password) {
  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    throw new Error("Error fetching user details");
  }
}

module.exports = { getUserByEmailAndPassword };
