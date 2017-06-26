var mongoose=require("mongoose");
var hotelCreate=require("./h");
var Comment=require("./comments")

/*var data=[
    {
       name: "Park Plaza", 
        image: "https://cache.carlsonhotels.com/ow-cms/pkp/images/hotels/INDPKZR/Marquee-1.jpg",
        description: "Pool, spa and fitness studio provide relaxation outlets Unpack your bags and head to the outdoor swimming pool for splash time, a great way to decompress after your flight to Zirakpur. Park Plaza also offers a fitness studio, spa and steam room to help you focus on relaxation during your stay. With a transfer service to nearby transit hubs for a fee, you can travel to and from destinations with ease.   At Park Plaza, you can stay put for every meal since you have your choice of three dining venues from which to choose. Essence is the spot for globally inspired dishes, and Zaranj serves flavourful Indian cuisine to wake up your taste buds. Meet other guests at Free Spirit for conversation, cocktails and light snacks. If you prefer to dine in private, room service is also available HOTEL AMENITIES High-speed Internet Pool Fitness Center Suites Room Servic Restaurant "  
    },
    {
         name: "Desert Mesa", 
        image: "https://farm4.staticflickr.com/3859/15123592300_6eecab209b.jpg",
        description: "Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical; it's not genuine, correct, or comprehensible Latin anymore. While lorem ipsum's still resembles classical Latin, it actually has no meaning whatsoever. As Cicero's text doesn't contain the letters K, W, or Z, alien to latin, these, and others are often inserted randomly to mimic the typographic appearence of European languages, as are digraphs not to be found in the original."
    },
    {
         name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        description: "Lorem ipsum is a pseudo-Latin text used in web design, typography, layout, and printing in place of English to emphasise design elements over content. It's also called placeholder (or filler) text. It's a convenient tool for mock-ups. It helps to outline the visual elements of a document or presentation, eg typography, font, or layout. Lorem ipsum is mostly a part of a Latin text by the classical author and philosopher Cicero. Its words and letters have been changed by addition or removal, so to deliberately render its content nonsensical; it's not genuine, correct, or comprehensible Latin anymore. While lorem ipsum's still resembles classical Latin, it actually has no meaning whatsoever. As Cicero's text doesn't contain the letters K, W, or Z, alien to latin, these, and others are often inserted randomly to mimic the typographic appearence of European languages, as are digraphs not to be found in the original."
    }
]
*/
function seedsDb(){
    hotelCreate.remove({},function(err,res){
     /*   if(err){
            console.log(err);
        } else{
            console.log("removed");
            data.forEach(function(seeds){
                hotelCreate.create(seeds,function(err,hotel){
                    if(err){
                        console.log(err)
                        
                    } else{
                        Comment.create({
                            text:"good",
                            author:"homer"
                        },function(err,comment){
                            if(err){
                                console.log(err)
                            } else{
                                hotel.comments.push(comment);
                                hotel.save();
                                console.log("comment added")
                            }
                        })
                    }
                })
            })
        }*/
    })
}
module.exports=seedsDb;


