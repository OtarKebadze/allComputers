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
    getMainPage,
    logOut
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
        failureRedirect: "/session/login_fail",
        failureMessage: true,
    }),
    loginUser
);

routerSession.get("/login", getLoginPage);

routerSession.get("/main", getMainPage);

routerSession.get("/login_fail", getFailLoginPage);

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

//                  LOGOUT                   //

// °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

routerSession.post("/logout", logOut);

module.exports = routerSession;
