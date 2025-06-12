const express=require("express");
const router=express.Router();
const ExpressError = require("../utils/ExpressError.js");
const multer=require("multer");
const {storage}=require("../cloudconfig.js");
const uploads=multer({storage})
const Listing=require("../models/listing.js");

const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedIn, isOwner}=require("../middleware.js");
const { index, renderNewform, showroute, createlisting, deletebyid, deleteby, updatelisting } = require("../controllers/listings.js");

router.get("/",index);



router.get("/new",isLoggedIn,renderNewform);

router.get("/edit/:id",isLoggedIn,isOwner,showroute);

router.put("/:id",isLoggedIn,uploads.single("listing[image]"),isOwner,updatelisting);


router.delete("/delete/:id",isLoggedIn,isOwner,deleteby);

router.get("/:id",deletebyid);


router.post("/",isLoggedIn,uploads.single("listing[image]"),wrapAsync(createlisting));



module.exports=router;