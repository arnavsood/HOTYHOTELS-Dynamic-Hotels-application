var mongoose=require("mongoose");


var commentSchema= mongoose.Schema({
    text:String,
author:{
            //1
            id:
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            //2
            username:String
    }
})




module.exports=mongoose.model("Comment",commentSchema)