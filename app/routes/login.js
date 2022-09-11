const express = require("express");
const routerLogin = express.Router();
const { 
logInUser,
logUserFailed 
} = require("../controllers/login");

routerLogin.get("/", logInUser);

routerLogin.get("/login_error", logUserFailed);

module.exports = routerLogin;
