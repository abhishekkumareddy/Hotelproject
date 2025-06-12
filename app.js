if(process.env.NODE_ENV!="production"){
require('dotenv').config();
}
const express=require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const methodoverride=require("method-override");
const ejsmate=require("ejs-mate");
const listingrouter=require("./routes/listing.js");
const session=require("express-session");
const MongoStore=require("connect-mongo")
const reviewrouter=require("./routes/review.js");
const flash=require("connect-flash");
const joi=require("joi");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const userrouter=require("./routes/user.js");
const multer=require("multer");


app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.use(methodoverride("_method"));
app.engine('ejs',ejsmate);
app.use(express.static(path.join(__dirname,"/public")));

const store=MongoStore.create({
    mongoUrl:process.env.ONLINEDB_USER,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});


const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+ 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly:true
    }
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



main().then(()=>{
    console.log("conncted");
}).catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(process.env.ONLINEDB_USER);
}


app.listen(8080,()=>{
    console.log("server is listening");
});


app.use((req,res,next)=>{
    res.locals.success=req.flash("Success");
    res.locals.error=req.flash("error");
    res.locals.curruser=req.user
    next();
})


app.use("/listings",listingrouter);
app.use("/listing/:id/review",reviewrouter);
app.use("/",userrouter);

app.get("/demouser",async(req,res)=>{
let fakeuser=new User({
    email:"student@gmail.com",
    username:"delta-student"
})

let registerUser=await User.register(fakeuser,"helloworld");
res.send(registerUser);
});

