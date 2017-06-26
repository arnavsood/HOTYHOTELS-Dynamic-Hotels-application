var mongoose=require("mongoose");
//Schema for Creating Hotels

var hotelSchema= new mongoose.Schema(
    {
        name:String,
        image:String,
        price:String,
        location:String,
        lat:Number,
        lng:Number,
        description:String,
        author:{
                
               id:{ type: mongoose.Schema.Types.ObjectId,
                ref:"User"},
                username:String
        },
        comments:[
            {
                 type: mongoose.Schema.Types.ObjectId,
                 ref: "Comment"
            }
            ]
         
     }
);

//Model my hotelSchema create a  new collection to our database(hotyhotels).Collection name is -"hotellists"
 module.exports=mongoose.model("hotellists",hotelSchema);




        
      