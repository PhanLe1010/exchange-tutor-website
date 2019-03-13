var express     = require("express"),
    router      = express.Router(),
    Post        = require("../models/post"),
    User        = require("../models/user"),
    middleware  = require("../middleware/index");
    
//Index - show all posts
router.get("/posts", function(req, res){
    req.flash("url");          //clear req.flash("url")
    req.flash("url", req.path);
    //get all posts from DB
    Post.find({}, function(err, allPosts){
        if(err){
            req.flash("error", "Something went wrong!");
            console(err);
        }
        else{
            res.render("posts/index", {posts: allPosts});
        }
    });
});

//NEW - show form to create new post
router.get("/posts/new", middleware.isLoggedIn, function(req, res){
   res.render("posts/new"); 
});

//Create a new Post and add it to DB
router.post("/posts", middleware.isLoggedIn, function(req, res){
    // get data from form and add to campgrounds array
    var title = req.body.title;
    var subject = req.body.subject;
    var content = req.body.content;
    User.findById(req.user._id,function(err, foundUser){
        var author = {
            id: foundUser._id,
            fullName: foundUser.fullName
        }
        var newPost = {title: title, subject: subject, content: content, author:author}
        // Create a new post and save to DB
        Post.create(newPost, function(err, commingbackPost){
            if(err){
                req.flash("error", "Something went wrong!");
                console.log(err);
            } else {
                //redirect back to posts page
                req.flash("success", "Successfully created a new post!");
                res.redirect("/posts");
            }    
        })
    })
} )

// SHOW - shows more info about one post
router.get("/posts/:id", function(req, res){
    //find the post with provided ID
    Post.findById(req.params.id).populate("comments").exec(function(err, foundPost){
        if(err){
            req.flash("error", "Post not Found!");
            console.log(err);
        } else {
            //render show template with that campground
            res.render("posts/show", {post: foundPost});
            req.flash("url", "posts/"+foundPost._id);
        }
    });
});

// EDIT POST ROUTE
router.get("/posts/:id/edit",middleware.checkPostOwnership, function(req, res){
    Post.findById(req.params.id, function(err, foundPost){
        res.render("posts/edit", {post: foundPost});
    });
});

// UPDATE ROUTE
router.put("/posts/:id",middleware.checkPostOwnership, function(req, res){
    // find and update the correct post
    Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost){
       if(err){
           req.flash("error", "Something went wrong!");
           res.redirect("/campgrounds");
       } else {
           //redirect to show page
           res.redirect("/posts/" + req.params.id);
       }
    });
});


// DESTROY ROUTE
router.delete("/posts/:id",middleware.checkPostOwnership, function(req, res){
   Post.findByIdAndRemove(req.params.id, function(err){
      if(err){
          req.flash("error", "Something went wrong! Can not delete");
          res.redirect("/posts");
      } else {
          req.flash("success", "Successfully deleted the post!");
          res.redirect("/posts");
      }
   });
});

// Find posts by subjects
router.get("/posts/sortBy/:subject", function(req, res) {
        req.flash("url");          //clear req.flash("url")
        req.flash("url", req.path);
        //find all :subjects posts
        Post.find({subject: req.params.subject}, function(err, foundPosts) {
            if(err){
                req.flash("error", "Something went wrong!");
                console(err);
            }
            else{
                res.render("posts/index", {posts: foundPosts});
            }
        })
})



module.exports = router;