const { transporter } = require("../../config/transportNodemailer");
const { DaoCartMongoose } = require("../daos/daoCartMongoose");
const { httpError } = require("../helpers/handleError");
const { CartService } = require("../services/cart");
const { GMAIL } = process.env

class ControllerSession {
    constructor() {
        this.dao = new DaoCartMongoose();
        this.cart = new CartService();
    }

    registerNewUser = async (req, res) => {
        try {
            await transporter.sendMail({
                from: GMAIL, 
                to: GMAIL, 
                subject:"New Registration",
                html: `${req.user.username} registered succesfully to allComputers` , 
            });

            let { username } = req.body;
            let cart = await this.dao.createCart(username);
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
            let { username } = req.user;
            let cart = await this.dao.getAll();
            let userCart = cart.filter((cart) => cart.userCart === username);
            let totalPrice = await this.cart.getTotalPrice(username);
            res.render("mainpage", { userCart, username, totalPrice });
        } catch (error) {
            httpError(res, error);
        }
    };
}

module.exports = {
    ControllerSession,
};
