var request = require('request');
var jsonfile = require('jsonfile');
var fs = require('fs');
var cacheEnabled = true;
var path = require('path');


var options = {
  uri: 'https://www.birminghamairport.co.uk/Api/FidApi/GetFlights',
  body: require('../bhx/request-body'),
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded','accept' : 'application/json'
  }
};

var filePath = path.join(process.cwd(),'cache', 'data.json');

function readFromCache (cb){

  fs.readFile(filePath,'utf8', (err,data) => {
    if(!err && data.length > 0 && cacheEnabled) {
      data = JSON.parse(data);
      data.source = 'disk';
      return cb(data);
    }
    return cb(null);
  });

};

function getDataFromServer(cb){
  request(options, function(error, response, body){
    if(!error){
      //body = body.replace("/Date(","").replace(")/","");
      let data = JSON.parse(body);
      data.source = 'server';
      if(data.success){
        jsonfile.writeFile(filePath,data);
        cb(data);
      }
    }
  })
};

function getData (cb) {

  readFromCache((data) => {
    if(data){
      cb(data);
    } else {
      getDataFromServer((data) => cb(data));
    }
  })
}

module.exports = {

  load : function ( callback ) {
    getData( data => {
        callback(null, {
            source : data.source,
            arrivals: data.data.arrivals,
            departures: data.data.departures,
        });
    })
  }
}
