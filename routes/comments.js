var mongoose=require("mongoose");
var express=require("express");
var router=express.Router({mergeParams:true});
var Comment=require("../models/comments");
var hotelCreate=require("../models/h");
var middleware =require("../middleware")





// comment route
// get route
router.get("/new",middleware.isloggedIn,function(req, res) {
    hotelCreate.findById(req.params.id,function(err,hotel){
        if(err){
            res.redirect("/hotels")
        } else{
            
            res.render("comments/new",{hotel:hotel})

        }
    })
    
});

    //create route =post route
router.post("/",middleware.isloggedIn,function(req,res){
    hotelCreate.findById(req.params.id,function(err, hotel) {
        
       if(err){
           console.log(err);
           res.redirect("/campgrounds")
       } else{
         var text=req.body.text;
        
         var author=req.body.author;
        
         Comment.create({text:text,author:author},function(err,comment){
             if(err){
                 console.log("error")
             } else{
                 //add username and id to comment
                 console.log("the user associated is "+req.user.username);
                
                 comment.author.id=req.user._id;
                 
                 comment.author.username=req.user.username;
                
                 //save comment by push
                 comment.save();
                 req.flash("success"," Successfully Added Comment")
                 hotel.comments.push(comment);
                 hotel.save();
                 
                 
                 res.redirect("/hotels/"+hotel._id)
                 
                
             }
         })
       }
    });
})    
//edit route
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
   var hotelId=req.params.id;
   Comment.findById(req.params.comment_id,function(err, comment) {
       if(err){
           res.redirect("back")
       } else{
           res.render("comments/edit.ejs",{hId:hotelId,comment:comment});
       }
   })
})


//update route

router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
   
    var commentbody=req.body.commentBody;
  console.log(commentbody)
    Comment.findById(req.params.comment_id,function(err,comment) {
        if(err){
            res.redirect("back");
            
        }  else{
           comment.text=commentbody;
           comment.save();
           req.flash("success","Updated Successfully")
           res.redirect("/hotels/"+req.params.id);
        }
    })
    
    
})

router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,comment) {
        if(err){
            console.log("err");
            res.redirect("back");
        } else{
            comment.remove();
            comment.save;
            req.flash("error","Deleted Successfully")
            res.redirect("/hotels/"+req.params.id)
        }
    })
})



module.exports=router;
