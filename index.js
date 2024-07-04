const express = require("express");
const body_parser = require("body-parser");
const teamUserRouter = require("./router/teamUser.router");
const projectRouter = require("./router/project.router");
const wingsRouter = require("./router/wings.router");
const flatRouter = require("./router/flat.router");
const adminUserRouter = require("./router/adminUser.router");
const floorRouter = require("./router/floor.router");
const historyRouter = require("./router/history.router");

const app = express();
const PORT = 3000;

app.use(body_parser.json());
app.use("/", teamUserRouter);
app.use("/projects", projectRouter);

app.use("/wings", wingsRouter);
app.use("/flats", flatRouter);
app.use("/adminUser", adminUserRouter);
app.use("/floors", floorRouter);
app.use("/flatHistory", historyRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
