const { httpError } = require("../helpers/handleError");

const logInUser = (req, res) => {
    try {
        res.render('login')
    } catch (error) {
        httpError(res, error);
    }
};

const logUserFailed = (req, res) => {
    try {
        res.render('login_error')
    } catch (error) {
        httpError(res, error);
    }
};

module.exports = { logInUser ,logUserFailed };
