const Listing=require("../models/listing");
const Review=require("../models/review");


module.exports.createreview= async(req,res)=>{
   let listing=await Listing.findById(req.params.id);
   let newReview =new Review(req.body.review);
   newReview.author=req.user._id;
   listing.reviews.push(newReview);
   await newReview.save();
   await listing.save();
   res.redirect(`/listings/${listing._id}`);
}

module.exports.destroyreview=async (req,res)=>{
    let {id,reviewid}=req.params;
   await  Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
   await  Review.findByIdAndDelete(reviewid);
    res.redirect(`/listings/${id}`);
}