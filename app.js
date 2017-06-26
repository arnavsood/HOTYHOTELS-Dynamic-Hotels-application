var express      =require("express"), //take express package
app              =express(),    //use express by running it and saving in a variable called app
bodyParser       = require('body-parser'),//Take body elements from post request
mongoose         =require("mongoose"),//take mongoose for our mongo db
passport         =require("passport"),
LocalStrategy    =require("passport-local"),
hotelCreate      =require("./models/h"),
 seedsDb          =require("./models/seeds"),
 flash            =require("connect-flash"),  
 User             =require("./models/user"),
 geocoder         = require('geocoder'),
 Comment         =require("./models/comments");
 
 var methodOverride=require("method-override");
 
 var commentRoutes=require("./routes/comments.js");
 var hotelsRoute=require("./routes/hotels.js");
 var authRoute=require("./routes/auth.js");
 
//connect a db called hotyhotels and If db not exists make a new for us 
mongoose.connect("mongodb://localhost/hotyhotels");
//It is only to run our body parser.Please just copy the line every single time
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname+"/public"));

var promice=mongoose.promice;
//passport confg
app.use(require("express-session")({
    secret:"a cup a haters",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.deserializeUser(User.deserializeUser());
passport.serializeUser(User.serializeUser());
app.use(methodOverride("_method"));

//flash messgages executions
app.use(flash());

app.use(function(req, res, next){
   res.locals.myUser = req.user;
   res.locals.error=req.flash("error");
   res.locals.success=req.flash("success");
   
   next();
});

//dry up the code
// first string agr decide the dry up route process
app.use(authRoute);
app.use("/hotels",hotelsRoute);
app.use("/hotels/:id/comments",commentRoutes);


/*seedsDb();*/




app.set("view engine", "ejs");


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("started server")
})
