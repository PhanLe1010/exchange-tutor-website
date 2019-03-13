var     express     = require("express"),
        app         = express(),
        bodyParser  = require("body-parser"),
        mongoose    = require("mongoose"),
        Post        = require("./models/post"),
        User        = require("./models/user"),
        Comment     = require("./models/comment"),
        flash       = require("connect-flash"),
        passport    = require("passport"),
        LocalStrategy = require("passport-local"),
        methodOverride = require("method-override"),
        expressSession = require("express-session");

        
//requiring routes
var     indexRoutes      = require("./routes/index"),
        postRoutes          = require("./routes/posts"),
        commentRoutes       = require("./routes/comments");
    
    
//connect to DB   
mongoose.connect("mongodb://localhost/tutor_exchange");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());
app.use(express.static("image"));

//Passport confifuaration 
app.use(expressSession({
    secret: "You will nerver know our secret1",
    resave: true,
    saveUninitialized: true
}));



app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error    = req.flash("error");
    res.locals.success =req.flash("success");
    next();
    
});

app.use(indexRoutes);
app.use(postRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Tutor Exchange server has started!");
})