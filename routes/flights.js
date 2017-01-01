var express = require('express');
var router = express.Router();
var request = require('request');
var jsonfile = require('jsonfile');
var fs = require("fs");
var formurlencoded = require('form-urlencoded');

var cacheEnabled = true;

var options = {
  uri: "https://www.birminghamairport.co.uk/Api/FidApi/GetFlights",
  body: formurlencoded({
    "Arrivals": {
      flightType: "Arrivals",
      searchType: "Destination",
      query: "",
      timespan: "EightHours"
    },
    "Departures": {
      flightType: "Departures",
      searchType: "Destination",
      query: "",
      timespan: "EightHours"
    },
  }),
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded","accept" : "application/json"  
  }
};

let filePath = process.cwd() + '\\cache\\data.json';

router.get('/', function(req, res, next) {
  getData(data => res.json(data));
});

router.get('/arrivals',(req, res, next) => {
  res.render('index',{title: 'ARRIVALS'});
});

router.get('/departures',(req, res, next) => {
  res.render('index',{title: 'DEPARTURES'});
});

function getData(cb) {

  readFromCache((data) => {
    if(data){
      cb(data);
    } else {
      getDataFromServer((data) => cb(data));
    }
  });
}

function readFromCache(cb){

  fs.readFile(filePath,'utf8', (err,data) => {
    if(!err && data.length > 0 && cacheEnabled) {
      data = JSON.parse(data);
      data.source = "disk";
      cb(data);
    }
    cb(null);
  });

}
function getDataFromServer(cb){
  request(options, function(error, response, body){
    if(!error){
      let data = JSON.parse(body);
      data.source = "server";
      if(data.success){
        jsonfile.writeFile(filePath,data);
        cb(data);
      }
    }
  });
}
module.exports = router;
