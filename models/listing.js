const mongoose=require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review.js");

const listingSchema= new Schema({
    title:{
        type: String,
        required:true,
    },
    description:String,
    image:{
        url:String,
        filename:String
    },
    price:Number,
    location:String,
    contry:String,
    reviews:[
{   
         type:Schema.Types.ObjectId,
         ref:"Review",
}    ],
owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},
categorie:{
    type:String,
    enum:["mountains","farms","farms"]
}
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing)
       await Review.deleteMany({_id:{$in:listing.reviews}})
})
const Listing=mongoose.model("Listing",listingSchema);
module.exports = Listing;