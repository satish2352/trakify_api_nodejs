const mongoose = require("mongoose");

const connection = mongoose
  .createConnection(
    "mongodb+srv://aaryang0605:12343000@tracify.bwaowhq.mongodb.net/tracify?retryWrites=true&w=majority&appName=Tracify"
  )
  .on("open", () => {
    console.log("MongodB has started");
  })
  .on("error", () => {
    console.log("Error");
  });

module.exports = connection;
