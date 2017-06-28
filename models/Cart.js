var mongoose=require("mongoose");

var cartSchema= new mongoose.Schema({
    item:String,
    price:String
})

module.exports=mongoose.model("cartlist",cartSchema);