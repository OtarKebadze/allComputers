const checkAuthenticated = (req,res,next)=>{
    if(req.user){
        //req.isAuthenticated() will return true if user is logged in
        return next();
    } else{
    res.redirect("/api/session/login");
    }
}

module.exports = checkAuthenticated;