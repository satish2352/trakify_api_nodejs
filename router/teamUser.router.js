const express = require("express");
const { signIn, createTeamUser } = require("../controller/teamUser.controller");

const authRouter = express.Router();

authRouter.post("/m_signin", signIn);
authRouter.post("/m_createTeamUser", createTeamUser);

module.exports = authRouter;
