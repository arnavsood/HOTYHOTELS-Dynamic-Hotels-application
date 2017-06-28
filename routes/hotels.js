var mongoose=require("mongoose");
var express=require("express");
var router=express.Router();
var hotelCreate=require("../models/h.js");
var middleware=require("../middleware")
var geocoder=require('geocoder');



// route for hotels page 
router.get("/",function(req,res)
    {
        hotelCreate.find({},function(error,content) //find all the hotels in the database/collection-hotellists
            {  
                if(error){console.log("error")}
                else{
                    
                    
                    res.render("hotels/hotels",{hotels:content,myUse: req.user} );// pass the content in hotels.ejs in variable hotels
            }
    }
 );
   
    
});

router.get("/new",middleware.isloggedIn,function(req, res) {
    res.render("hotels/new.ejs");
})

router.post("/",middleware.isloggedIn,function(req,res){
   var name=req.body.name;
   var image=req.body.image;
   var description=req.body.description;
   var price=req.body.price;
    geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
   
   hotelCreate.create({name:name,image:image,description:description,price:price,location: location, lat: lat, lng: lng},function(err,hotel){
       if(err){
           console.log(err);
       } else{
           hotel.author.username=req.user.username;
        
           hotel.author.id=req.user._id;
            hotel.save();
            console.log(hotel);
            req.flash("success","You have created the new hotel");
           res.redirect("/hotels");
           
       }
   })
   })
    
})

// show route
router.get("/:id",function(req, res){
    hotelCreate.findById(req.params.id).populate("comments").exec(function(err,content){
        if(err){
            console.log(err)
        } else{
           
            console.log(content);
            
        
            
            res.render("hotels/show",{content:content});
        }
    })
})


//edit 
router.get("/:id/edit",middleware.checkHotelOwnership,function(req, res) {
   hotelCreate.findById(req.params.id,function(err, foundHotel) {
       if(err){
           
           console.log(err);
       } else{
           res.render("hotels/edit",{hotel:foundHotel})
       }
       
   }) 
   
    
})

//update
router.put("/:id", function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newData = {name: req.body.name, image: req.body.image, description: req.body.description, price: req.body.price, location: location, lat: lat, lng: lng};
    hotelCreate.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, hotel){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/hotels/" +hotel._id);
        }
    });
  });
});



//destroy
router.delete("/:id",middleware.checkHotelOwnership,function(req,res){
   hotelCreate.findByIdAndRemove(req.params.id,function(err,deletedHotel){
       if(err){
           console.log("err");
           req.flash("error","error in deleting")
           
       }else{
           console.log("deleted");
           req.flash("error","Deleted Successfully")
           res.redirect("/hotels");
       }
   })
    
})






module.exports=router;
