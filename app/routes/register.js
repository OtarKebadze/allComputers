const express = require("express");
const routerRegister = express.Router();
const { registerNewUser } = require("../controllers/register");

routerRegister.use("/", registerNewUser);

module.exports = routerRegister;
