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
            res.redirect("/");
        } catch (error) {
            httpError(res, error);
        }
    };

    getRegisterPage = (req, res) => {
        try {

            res.render("register");
        } catch (error) {
            httpError(res, error);
        }
    };

    loginUser = (req, res) => {
        try {
            res.redirect(`/main`);
        } catch (error) {
            httpError(res, error);
        }
    };


    getLoginPage = (req, res) => {
        try {
            res.render("login");
        } catch (error) {
            httpError(res, error);
        }
    };

    getFailRegisterPage = (req, res) => {
        try {
            res.render("register_fail");
        } catch (error) {
            httpError(res, error);
        }
    };

    getFailLoginPage = (req, res) => {
        try {
            res.render("login_fail");
        } catch (error) {
            httpError(res, error);
        }
    };

    logOut = async (req, res) => {
        req.session.destroy((err) => {
            if (req.session === undefined) {
                setTimeout(() => {
                    res.redirect(`/`);
                }, 1000);
            }
        });
    };

    getMainPage = async (req, res) => {
        try {
            let cart = await this.dao.getAll();
            let userCart = cart.filter(
                (cart) => cart.userCart === req.user.username
            );
            let user = req.user.username
            res.render("mainpage", { userCart, user });
        } catch (error) {
            httpError(res, error);
        }
    };
}

module.exports = {
    ControllerSession,
};
