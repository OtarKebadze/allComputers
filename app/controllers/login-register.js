
const registerNewUser = (req, res) => {
    try {
    res.redirect("/session/login")
    } catch (error) {
        httpError(res,error)
    }
};

const getRegisterPage = (req, res) => {
    try {
        res.render("register")
    } catch (error) {
        httpError(res,error)
    }
};

const loginUser = (req, res) => {
    try {
        console.log("soy login")
    } catch (error) {
        httpError(res,error)
    }
};

const getLoginPage = (req, res) => {
    try {
        res.render("login")
    } catch (error) {
        httpError(res,error)
    }
};

const getFailRegisterPage = (req, res) => {
    try {
        res.render("register_fail")
    } catch (error) {
        httpError(res,error)
    }
};

const getFailLoginPage = (req, res) => {
    try {
        res.render("login_fail")
    } catch (error) {
        httpError(res,error)
    }
};
module.exports = {
    registerNewUser,
    getRegisterPage,
    loginUser,
    getLoginPage,
    getFailRegisterPage,
    getFailLoginPage
}