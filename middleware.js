const Listing=require("./models/listing");
const Review=require("./models/review");

const review = require("./models/review");

module.exports.isLoggedIn=(req,res,next)=>{
     if(!req.isAuthenticated()){
      req.session.redirectUrl=req.originalUrl;
    req.flash("error","you must be logged in to create listing")
   return  res.redirect("/login");
  }
  next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner=async (req,res,next)=>{
   let {id}=req.params;
    let listing=await Listing.findById(id);
    if(! listing.owner._id.equals(res.locals.curruser._id)){
      req.flash("error","you don't have permisiion to edit");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
module.exports.isReviewAuthor = async (req,res,next)=>{
  let {reviewId}=req.params;
  let review = await Review.findById(reviewId);
  if(!review.author.equals(res.locals.curruser._id.author)){
    return res.redirect(`/listings/${id}`);
  }
  next();
}