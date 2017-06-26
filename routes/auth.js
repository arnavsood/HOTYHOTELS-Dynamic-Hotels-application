
var mongoose=require("mongoose");
var express=require("express");
var router =express.Router();
var hotelCreate=require("../models/h")
var passport=require("passport");
var User=require("../models/user")

//root
router.get("/",function(req,res)
    {
        res.render("hotels/landing",{});
    }
);

//auth routes
// register




router.get("/register",function(req, res) {
    res.render("register")
})  

router.post("/register",function(req, res) {
    var newUser=new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            
            req.flash("error",err.message);
            return res.redirect("register");
            } 
            console.log(user);
            
            passport.authenticate("local")(req,res,function(){
                req.flash("success","welcome you signup successfully as "+user.username);
                res.redirect("/hotels")
            })
    })
})

//login
//show login form
router.get("/login",function(req, res) {
    res.render("login")
} )
router.post("/login",passport.authenticate("local",
    {   
        successRedirect:"/hotels",
        
       failureRedirect: "/login"
        }),function(req,res){
          
    })
    //logout Route
router.get("/logout",function(req, res) {
    req.logout();
    req.flash("success","LoggedOut Sucessfully")
    res.redirect("/hotels")
})    

module.exports=router;