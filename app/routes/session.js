const { Router } = require("express");

const passport = require("../middlewares/passport");
const {
    ControllerSession,
} = require("../controllers/session");
const checkAuthenticated = require("../middlewares/auth");

class RouterSession {
    constructor() {
        this.controller = new ControllerSession();
    }
    config() {

        const routerSession = Router();

        // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

        //                 REGISTER                  //

        // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

        routerSession.post(
            "/register",
            passport.authenticate("register", {
                failureRedirect: "/register_fail",
                failureMessage: true,
            }),
            this.controller.registerNewUser
        );

        routerSession.get("/register", this.controller.getRegisterPage);

        routerSession.get("/register_fail", this.controller.getFailRegisterPage);

        // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

        //                  LOGIN                    //

        // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

        routerSession.post(
            "/login",
            passport.authenticate("autenticate", {
                failureRedirect: "/login_fail",
                failureMessage: true,
            }),
            this.controller.loginUser
        );

        routerSession.get("/", this.controller.getLoginPage);



        routerSession.get("/main", checkAuthenticated, this.controller.getMainPage);

        routerSession.get("/login_fail", this.controller.getFailLoginPage);

        // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

        //                  LOGOUT                   //

        // °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°//

        routerSession.post("/logout", this.controller.logOut);

        return routerSession;
    }
}

module.exports = {
    RouterSession,
};
