const Listing=require("../models/listing");
module.exports.index=async (req,res)=>{
    const alllisting=await Listing.find({});
    res.render("listings/index", { alllisting });
};

module.exports.renderNewform=(req,res)=>{
 
     res.render("listings/create");
}

module.exports.showroute=async (req,res)=>{
    let {id}=req.params;
    let chat= await Listing.findById(id);

    res.render("listings/edit",{chat});
}

module.exports.createlisting=async (req,res,next)=>{
  let url=req.file.path;
  let filename=req.file.filename;
  const newchat= new Listing(req.body.listing);
  newchat.owner = req.user._id;
  newchat.image={url,filename};
 await newchat.save();
 req.flash("Success","New listing created");
  res.redirect("/listings");

}

module.exports.deletebyid=async (req,res)=>{
    let {id}=req.params;
    
    let data=await Listing.findById(id).populate({path:"reviews",populate:{path:"author"}}).populate("owner");

    if(!data){
      req.flash("Success","listing you requested was deleted");
      res.redirect("/listings");
    }
    res.render("listings/detail",{data});
}
module.exports.deleteby=async(req,res)=>{
   let {id}=req.params;
   await Listing.findByIdAndDelete(id);
   req.flash("Success","listing deleted");
   res.redirect("/listings");
}


module.exports.updatelisting=async (req,res)=>{
    let {id}=req.params;
   let listing=await  Listing.findByIdAndUpdate(id,{...req.body.listing},{ runValidators: true });
   if(typeof req.file !== "undefined"){
   let url=req.file.path;
  let filename=req.file.filename;
  listing.image={url,filename};
  await listing.save();

   }
  //  res.redirect("/listings");
      res.redirect(`/listings/${id}`);
}