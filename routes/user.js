const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const passport=require("passport");
const {saveRedirectUrl}=require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { signup, signuprender, loginrender, login, logut } = require("../controllers/user.js");
router.get("/signup",signuprender);


router.post("/signup",wrapAsync(signup));


router.get("/login",loginrender);

router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),login);

router.get("/logout",logut);

module.exports=router;