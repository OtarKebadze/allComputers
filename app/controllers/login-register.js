
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
        res.redirect('http://localhost:8080/session/main')
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

const logOut = async (req,res)=> {
    req.session.destroy((err) => {
        if (req.session === undefined) {
          setTimeout(() => {
            res.redirect("http://localhost:8080/session/login");
          }, 1000);
        }
      });
}

const getMainPage = (req, res) => {
    try {
        res.render("mainpage")
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
    getFailLoginPage,
    getMainPage,
    logOut
}