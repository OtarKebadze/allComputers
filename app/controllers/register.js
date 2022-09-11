const { httpError } = require("../helpers/handleError");

const registerNewUser = (req, res) => {
    try {
        res.render('register')
    } catch (error) {
      httpError(res, error);
    }
  };

module.exports = { registerNewUser };