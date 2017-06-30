
var mongoose=require("mongoose");
var express=require("express");
var router =express.Router();
var hotelCreate=require("../models/h")
var passport=require("passport");
var User=require("../models/user");
var Cart=require("../models/Cart");
var middleware=require("../middleware");

//root
router.get("/",function(req,res)
    {
        res.render("hotels/landing",{});
    }
);

//cart post
router.post("/hotels/:id/add",middleware.isloggedIn,function(req, res) {
    hotelCreate.findById(req.params.id,function(err,foundHotel){
        if(err){
            res.redirect("back");
            req.flash("error","somthing went wrong")
        } else{
            console.log("found out the hotel for the cart");
            console.log(foundHotel)
            Cart.create({item:foundHotel.name,price:foundHotel.price},function(err,added){
                if(err){
                    console.log(err)
                } else{
                    User.findById(req.user._id,function(err, found) {
                        if(err){
                            console.log(err)
                        } else{
                            found.cart.push(added);
                            found.save();
                            console.log("saved")
                            req.flash("success","added to cart")
                            res.redirect("/hotels/"+req.params.id)
                            
                        }
                    })
                }
            });
            
            
        }
    })
  
})

//cart get
router.get("/cart",middleware.isloggedIn,function(req, res) {
    User.findById(req.user._id).populate("cart").exec(function(err,foundUser){
        if(err){
            console.log(err)
        } else{
            res.render("cart",{found:foundUser})
        }
    })
})

//delete cart
router.post("/cart/:id/delete",function(req, res) {
   Cart.findByIdAndRemove(req.params.id,function(err,deleted){
       if(err){
           console.log(err)
       } else{
           res.redirect("/cart")
       }
   })
    
})
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