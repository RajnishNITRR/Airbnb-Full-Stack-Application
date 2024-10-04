const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const ejs = require("ejs");
const path = require("path");
const { readdir } = require("fs");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const port = 8080;

const MONGO_URL = "mongodb://localhost:27017/wanderlust";

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    })
async function main() {
    await mongoose.connect(MONGO_URL);
}

app = express();
app.listen(port, () => {
    console.log(`server running at ${port}`);
})

app.set("view engine","ejs");
app.engine("ejs",ejsMate);
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));

// Index Route
app.get("/listings", async (req,res)=>{
   const allListing=  await Listing.find({});
   res.render("listings/index.ejs",{allListing})
});
// new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})
// show route
app.get("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show",{listing});

})
// edit route
app.get("/listings/:id/edit", async (req,res)=>{
    let {id}= req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});

})
// update route
app.put("/listings/:id", async(req,res)=>{
    let {id}= req.params;
    try{
        await Listing.findByIdAndUpdate(id,{...req.body.listing})
        res.redirect(`/listings/${id}`);

    }catch(error){
        console.error(error);
        res.status(500).send("Error updating the listing.");
    }
  
}
)
// delete route
app.delete("/listings/:id", async (req,res)=>{
   let {id} =req.params; 
   try{
      let deleted = await Listing.findByIdAndDelete(id);
       res.redirect("/listings");
      console.log(deleted)
   }catch(error){
    console.log(error)
   }

})


app.post("/listings", async (req,res)=>{
   const newlistings = new Listing(req.body.listing);
   await newlistings.save();

    res.redirect("/listings");
})




app.get("/", (req, res) => {
    res.send("Hi i am ");
    console.log("get request successfull");
})