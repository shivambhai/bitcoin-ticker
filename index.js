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
    var input;
    if(crypto == "BTC"){

       switch (fiat) {
        case "USD":
           input = data.BTCUSD;
          break;
        case "GBP":
           input = data.BTCGBP;
           break;
        case "EUR":
           input = data.BTCEUR;
           break;
       }
    }else 

    if (crypto == "ETH") {
      switch (fiat) {
        case "USD":
           input = data.ETHUSD;
           break;
        
        case "GBP":
           input = data.ETHGBP;
           break;
  
        case "EUR":
           input = data.ETHEUR;
           break;
       }
      
    }else

    if (crypto == "LTC") {

     switch (fiat) {
       case "USD":
          input = data.LTCUSD;
          break;
       
       case "GBP":
          input = data.LTCGBP;
          break;
 
       case "EUR":
          input = data.LTCEUR;
          break;
      }

    }

    var price = input.last;
    res.write(" "+price);
    res.write(" "+ data);
    res.send();
    console.log(input.last);
    console.log("------------");
   
    
  });
});



app.listen(4000, function () {
  console.log("server is running on 4000 port");
});

