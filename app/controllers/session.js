const { PORT } = require("../../config/index");
const { DaoCartMongoose } = require("../daos/daoCartMongoose");
const { httpError } = require("../helpers/handleError");

class ControllerSession {
    constructor() {
        this.dao = new DaoCartMongoose();
    }

    registerNewUser = async (req, res) => {
        try {
            let user = req.body.username;
            let cart = await this.dao.createCart(user);
            await this.dao.save(cart);
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

    getMainPage = async (req, res) => {
        try {
            let port = PORT;
            let cart = await this.dao.getAll();
            let userCart = cart.filter(
                (cart) => cart.userCart === req.user.username
            );
            let user = req.user.username
            console.log(userCart)
            res.render("mainpage", { port, userCart, user });
        } catch (error) {
            httpError(res, error);
        }
    };
}

module.exports = {
    ControllerSession,
};
