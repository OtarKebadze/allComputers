const { PORT } = require("../../config/index");

class ControllerSession {
    registerNewUser = (req, res) => {
        try {
            res.redirect("/session/login");
        } catch (error) {
            httpError(res, error);
        }
    };

    getRegisterPage = (req, res) => {
        try {
            let port = PORT;
            res.render("register", { port });
        } catch (error) {
            httpError(res, error);
        }
    };

    loginUser = (req, res) => {
        try {
            res.redirect(`http://localhost:${PORT}/session/main`);
        } catch (error) {
            httpError(res, error);
        }
    };

    getLoginPage = (req, res) => {
        try {
            let port = PORT;
            res.render("login", { port });
        } catch (error) {
            httpError(res, error);
        }
    };

    getFailRegisterPage = (req, res) => {
        try {
            let port = PORT;
            res.render("register_fail", { port });
        } catch (error) {
            httpError(res, error);
        }
    };

    getFailLoginPage = (req, res) => {
        try {
            let port = PORT;
            res.render("login_fail", { port });
        } catch (error) {
            httpError(res, error);
        }
    };

    logOut = async (req, res) => {
        req.session.destroy((err) => {
            if (req.session === undefined) {
                setTimeout(() => {
                    res.redirect(`http://localhost:${PORT}/session/login`);
                }, 1000);
            }
        });
    };

    getMainPage = (req, res) => {
        try {
            let port = PORT;
            res.render("mainpage", { port });
        } catch (error) {
            httpError(res, error);
        }
    };
}

module.exports = {
    ControllerSession,
};
