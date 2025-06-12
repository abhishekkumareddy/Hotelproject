const express=require("express");
const router=express.Router({mergeParams:true});
const Listing=require("../models/listing.js");
const Review = require("../models/review.js");

const { isLoggedIn, isOwner,isReviewAuthor } = require("../middleware.js");
const { createreview, destroyreview } = require("../controllers/reviews.js");


router.post("/",isLoggedIn,createreview);




router.delete(":reviewid",isLoggedIn,isReviewAuthor,destroyreview)


module.exports=router;