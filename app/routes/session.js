const { Router } = require("express");

const passport = require("../middlewares/passport");
const {
    ControllerSession,
} = require("../controllers/session");

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
                failureRedirect: "/session/register_fail",
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
                failureRedirect: "/session/login_fail",
                failureMessage: true,
            }),
            this.controller.loginUser
        );

        routerSession.get("/login", this.controller.getLoginPage);

        routerSession.get("/main", this.controller.getMainPage);

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
