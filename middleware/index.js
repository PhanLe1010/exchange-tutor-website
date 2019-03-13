//==================================================
//Middleware
//==================================================
var Post = require("../models/post");
var Comment = require("../models/comment");
var middlewareObj = {};


middlewareObj.checkPostOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Post.findById(req.params.id, function(err, foundPost){
           if(err){
               req.flash("error", "Post not found");
               res.redirect(req.flash().url[0]);
           }  else {
               // does user own the post?
            if(foundPost.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect(req.flash().url[0]);
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("/login");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect(req.flash().url[0]);
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission to do that");
                res.redirect(req.flash().url[0]);
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect(req.flash().url[0]);
    }
}




middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
        
    } else{
        req.flash("error", "You need to be logged in to do that");
        var path=req.path;
        if(req.path.includes("comments")){
            path = "/posts/"+req.params.id;
        } 
        req.flash("url");          //clear req.flash("url")
        req.flash("url", path);
        res.redirect("/login");
    }
}

module.exports = middlewareObj;