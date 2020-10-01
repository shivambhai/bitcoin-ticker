// TODO require express bodyparser and request
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

// use bodyParser for getting response from the local server
app.use(bodyParser.urlencoded({ extended: true }));

//get request for the web page
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  
  const options = {
    url:'https://apiv2.bitcoinaverage.com/indices/global/ticker/all?crypto='+crypto+'&fiat='+fiat,

    headers: {
      "x-ba-key": "ODkxZDA5MmIwOGQ1NGM5YmEwYzQ2MzhmZDk4NmM3NzY",
    },
  };

  request(options, function (error, response, body) {
    var data = JSON.parse(body); // here we convert the JSON object in the javascript object
    var input = Object.keys(data)[0];
    console.log(body[0].ask);
    console.log("--------------------");
    res.send(data);
  });
});



app.listen(4000, function () {
  console.log("server is running on 4000 port");
});

