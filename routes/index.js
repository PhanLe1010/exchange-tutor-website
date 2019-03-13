var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//===============================================
//root route-go to the landing page
//===============================================
router.get("/", function(req, res){
    req.flash("url");          //clear req.flash("url")
    req.flash("url", req.path);
    res.render("LandingPage");
})

// show register form
router.get("/register", function(req, res){
   res.render("register"); 
});

// show about page
router.get("/about", function(req, res){
   req.flash("url");          //clear req.flash("url")
   req.flash("url", req.path);
   res.render("about"); 
});
// show contact page
router.get("/contact", function(req, res){
   req.flash("url");          //clear req.flash("url")
   req.flash("url", req.path);
   res.render("contact"); 
});
// show FAQs page
router.get("/FAQs", function(req, res){
   req.flash("url");          //clear req.flash("url")
   req.flash("url", req.path);
   res.render("FAQs"); 
});

//handle sign up logic
router.post("/register", function (req, res) {
    if(req.body.password != req.body.confirmPassword){
        res.render("register", {error: "Passwords don't match!"});
    } else{
        var newUser = new User({
            username: req.body.username,
            email: req.body.email,
            fullName : req.body.fullName
        });
        User.register(newUser, req.body.password, function(err, user){
            if(err){
                req.flash("error", err.message);
                res.redirect("/register");
            } else {
                passport.authenticate("local")(req, res, function(){
                    req.flash("success", "You registered sucessfully! Welcome to the Tutor Exchange Website! " + user.fullName);
                    res.redirect("/posts");
                });
            }
        });
    }
});

//show login form
router.get("/login", function(req, res){
   var url =req.flash("url")[0];
   req.flash("url", url);
   res.render("login");
});

//handling login logic
router.post("/login",  passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), function(req, res){
        req.flash("success", "Hello! "+req.user.fullName)
        var path = req.flash("url")[0];
        if(!path || path ==""){
            res.redirect("/");
        } else {
            res.redirect(path);
        }
        }
);

// logout route
router.get("/logout", function(req, res){
   req.logout();
   req.flash("success", "You have logged out.");
   res.redirect("/posts");
});

module.exports = router;