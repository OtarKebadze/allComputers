const express = require("express");
const routerSession = express.Router();
const passport = require("../middlewares/passport");
const {
    registerNewUser,
    getRegisterPage,
    loginUser,
    getLoginPage,
    getFailRegisterPage,
    getFailLoginPage,
} = require("../controllers/login-register");

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

//                 REGISTER                  //

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

routerSession.post(
    "/register",
    passport.authenticate("register", {
        failureRedirect: "/session/register_fail",
        failureMessage: true,
    }),
    registerNewUser
);

routerSession.get("/register", getRegisterPage);

routerSession.get("/register_fail", getFailRegisterPage);

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

//                  LOGIN                    //

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

routerSession.post(
    "/login",
    passport.authenticate("autenticate", {
        failureRedirect: "/session/login",
        failureMessage: true,
    }),
    loginUser
);

routerSession.get("/login", getLoginPage);

routerSession.get("/login_fail", getFailLoginPage);

module.exports = routerSession;
