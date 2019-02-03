var middlewareObj = {};


// middle ware to check if user is login or not
middlewareObj.isLoggedIn = function  (req, res, next){
    if (req.isAuthenticated()) {
        console.log("middleware passed")
        return next ();
    }
    console.log("middleware failed")
    res.redirect("/lab/login");
};


module.exports= middlewareObj;
