const logger = require("../helpers/log4js");

const isAdmin = (req, res, next) => {
    if(req.user.isAdmin === true){
      logger.info(`Connected as Admin`)
      next()
    }else{
      res.redirect('/')
    }
  };

  
  module.exports= { isAdmin }