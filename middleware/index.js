var hotelCreate=require("../models/h.js");
var Comment =require("../models/comments.js")

// logic

/*{ checkHotelOwnership: [Function],
  checkCommentOwnership: [Function],
  isloggedIn: [Function] }*/

//logic

//all middlewares 
var middlewareObj={};
middlewareObj.checkHotelOwnership= function(req,res,next){ 
     if(req.isAuthenticated()){
        hotelCreate.findById(req.params.id,function(err,foundHotel){
            if(err){
                req.flash("error","Hotel not found ");
                res.redirect("back")
            } else{
                //does user own                                                                                 
                if(foundHotel.author.id.equals(req.user._id)){
                   next();
                    req.flash("success","Success")

                }else{
                    req.flash("error","you dont have permission to do that")
                    res.redirect("back");
                }
                
            }
         }) 
     } else{
         
         res.redirect("/login");
     }
}



middlewareObj.checkCommentOwnership=function(req,res,next){
     if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,comment){
            if(err){
                res.redirect("back")
            } else{
                //does user own
                if(comment.author.id.equals(req.user._id)){
                   
                   next();
                   
                }else{req.flash("error","You dont have permission.");
                    res.redirect("back");
                }
                
            }
         }) 
     } else{
         req.flash("error"," Login first")
         res.redirect("/login");
     }
}

//is logged in 
middlewareObj.isloggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
        
    }
    req.flash("error","You need to Login First");

    res.redirect("/login");
    
};

console.log(middlewareObj);

module.exports=middlewareObj;