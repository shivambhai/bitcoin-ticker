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
  var amount = req.body.amount;
  method='GET';
  const options = {
      // url for getting the full data of crypto currriencies 
      // url:'https://apiv2.bitcoinaverage.com/indices/global/ticker/all?crypto='+crypto+'&fiat='+fiat,

      // url for exchanging the value of cryto curriecies into fiat curriencies
    url:"https://apiv2.bitcoinaverage.com/convert/global",
    qs:{
      from:crypto,
      to:fiat,
      amount:amount,
    },
    headers: {
      "x-ba-key": "ODkxZDA5MmIwOGQ1NGM5YmEwYzQ2MzhmZDk4NmM3NzY",
    },
  };

  request(options, function (error, response, body) {
     // here we convert the JSON object in the javascript object
    // var data = JSON.parse(body);
    // var input;
    // if(crypto == "BTC"){

    //    switch (fiat) {
    //     case "USD":
    //        input = data.BTCUSD;
    //       break;
    //     case "GBP":
    //        input = data.BTCGBP;
    //        break;
    //     case "EUR":
    //        input = data.BTCEUR;
    //        break;
    //    }
    // }else 

    // if (crypto == "ETH") {
    //   switch (fiat) {
    //     case "USD":
    //        input = data.ETHUSD;
    //        break;
        
    //     case "GBP":
    //        input = data.ETHGBP;
    //        break;
  
    //     case "EUR":
    //        input = data.ETHEUR;
    //        break;
    //    }
      
    // }else

    // if (crypto == "LTC") {

    //  switch (fiat) {
    //    case "USD":
    //       input = data.LTCUSD;
    //       break;
       
    //    case "GBP":
    //       input = data.LTCGBP;
    //       break;
 
    //    case "EUR":
    //       input = data.LTCEUR;
    //       break;
    //   }

    // }


    // displaying the recieved full data of first project 
    // var price = input.last;
    // var current_date = input.display_timestamp;
    // res.write("<p> the current date is "+ current_date+ " </p>");
    // res.write(" <P> the current price of "+crypto + " is "+ input.last + " "+ fiat +" </p>");
    // res.send();
    // console.log("------------");


    // here is second project : showing the crypto curriecies in the fiat curriencies
    var data = JSON.parse(body);
    console.log(data);
    var price = data.price;
    var time=data.time;
    res.write("<h1>the value of "+ amount + " "+ crypto + " in "+ fiat + " is " +price +" "+ fiat+"</h1>");
    res.write("<p> and time when the conversion is happen is at"+ time+"</p>");
    res.send();
   
    
  });
});



app.listen(4000, function () {
  console.log("server is running on 4000 port");
});

