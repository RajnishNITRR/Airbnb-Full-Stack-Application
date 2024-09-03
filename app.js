const express = require("express");
const mongoose = require("mongoose");
const port = 8080;

const MONGO_URL = "mongodb://localhost:27017/wanderlust";

main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(MONGO_URL);
}

app = express();
app.listen(port,()=>{
    console.log(`server running at ${port}`);
})

app.get("/",(req,res)=>{
    res.send("Hi i am ");
    console.log("get request successfull");
})