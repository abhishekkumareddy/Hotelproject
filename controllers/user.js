const User=require("../models/user.js");

module.exports.signup=async(req,res)=>{
    try{
          let {username,email,password}=req.body;
    const newUser=new User({email,username});
   const registerUser=await User.register(newUser,password);
   req.flash("success","welcome to new user");
//    registerUser.save();
    req.login(registerUser,(err)=>{
        if(err){
            return next(err);
        }
         res.redirect("/listings");
    });
  
    }catch(e){
        req.flash("error","username already exist");

        res.redirect("/signup");
    }
   
}

module.exports.signuprender=(req,res)=>{
    res.render("users/signup");
}

module.exports.loginrender=(req,res)=>{
    res.render("users/login");
}

module.exports.login=async(req,res)=>{
    let redirectUrl=res.locals.redirectUrl||"/listings"
 res.redirect( redirectUrl);
}
module.exports.logut=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logout");
        res.redirect("/listings");
    });
}