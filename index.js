const express = require("express");
const bodyParser = require("body-parser");
const request =require("request");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
    console.log(req.body.crypto);
    res.send("<h1 >good job keep it up</h1>");
});

app.listen("3000", function(){
    console.log("server is running on 3000 port");
});