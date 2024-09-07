const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js")
const ejs = require("ejs");
const path = require("path");
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
app.set("views",path.join(__dirname,"views"));
app.set(express.urlencoded({extended:true}));

// Index Route
app.get("/listings", async (req,res)=>{
   const allListing=  await Listing.find({});
   res.render("listings/index.ejs",{allListing})
});


app.get("/listings/:id", async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show",{listing});

})











// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "my home ",
//         description: "By the beach",
//         price: 1200,
//         location: "calngute goa",
//         country: "India",
//     });
//     await sampleListing.save();
//     console.log("sample is saved");
//     res.send("successfull");
// });
app.get("/", (req, res) => {
    res.send("Hi i am ");
    console.log("get request successfull");
})