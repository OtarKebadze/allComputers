const autenticationUser = (req, res, next) => {
    req.user = {
      username: "Otar",
      isAdmin: true,
    };
    next();
  };
  const authorizeUser = (req, res, next) => {
    if (req.user.isAdmin) next();
    else
      res
        .status(403)
        .send({
          error: 403,
          descripcion: 'YOU HAVE NO PERMISSION',
        });
  };
  
  module.exports= {autenticationUser , authorizeUser};