var express     = require("express"),
    router      = express.Router(),
    Post        = require("../models/post"),
    Comment     =require("../models/comment"),
    User        =require("../models/user"),
    middleware  = require("../middleware/index");

//Comments New
router.get("/posts/:id/comments/new",middleware.isLoggedIn, function(req, res){
    // find post by id
    Post.findById(req.params.id, function(err, post){
        if(err){
            req.flash("error", "Something went wrong! Post not found");
            console.log(err);
        } else {
             res.render("comments/new", {post: post});
        }
    })
});

//Comments Create
router.post("/posts/:id/comments",middleware.isLoggedIn,function(req, res){
   //lookup post using ID
   Post.findById(req.params.id, function(err, post){
       if(err){
           req.flash("error", "Something went wrong! Post not found");
           console.log(err);
           res.redirect("/posts");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               req.flash("error", "Something went wrong!");
               console.log(err);
           } else {
               //add user fullName and id to comment
               //find user by ID
               User.findById(req.user._id, function(err, foundUser){
                   if(err){
                       req.flash("error", "Something went wrong!");
                       console.log(err);
                       res.redirect("/posts/"+ req.params.id);       
                   }
                   else{
                       comment.author.id = foundUser._id;
                       comment.author.fullName = foundUser.fullName;
                       //save comment
                       comment.save();
                       post.comments.push(comment);
                       post.save();
                       req.flash("success", "Successfully added comment");
                       res.redirect('/posts/' + post._id);
                   }
               })
           }
        });
       }
   });
});

// COMMENT EDIT ROUTE
router.get("/posts/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          req.flash("error", "Something went wrong!");
          res.redirect("/posts/"+req.params.id);
      } else {
        res.render("comments/edit", {post_id: req.params.id, comment: foundComment});
      }
   });
});

// COMMENT UPDATE
router.put("/posts/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          req.flash("error", "Something went wrong!");
          res.redirect("/posts/"+req.params.id);
      } else {
          req.flash("success", "Successfully edited your comment!");
          res.redirect("/posts/" + req.params.id );
      }
   });
});


// COMMENT DESTROY ROUTE
router.delete("/posts/:id/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //find the post and remove comment from comments array
    Post.update({_id: req.params.id},{$pull:{"comments":req.params.comment_id}} ,function(err){
        if(err){
           req.flash("error", "Something went wrong!");
           res.redirect("/posts");
        } else{
                //findByIdAndRemove the comment
                Comment.findByIdAndRemove(req.params.comment_id, function(err){
                   if(err){
                       req.flash("error", "Something went wrong!");
                       res.redirect("/posts/"+req.params.id);
                   } else {
                       req.flash("success", "Comment deleted!");
                       res.redirect("/posts/" + req.params.id);
                   }
                });
        }
        
    })

});

module.exports = router;