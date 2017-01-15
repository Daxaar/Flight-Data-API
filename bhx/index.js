var request = require('request');
var jsonfile = require('jsonfile');
var fs = require('fs');
var path = require('path');

var cacheEnabled = false;

var options = {
  uri: 'https://www.birminghamairport.co.uk/Api/FidApi/GetFlights',
  body: require('../bhx/request-body'),
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded','accept' : 'application/json'
  }
};

var filePath = path.join(process.cwd(),'cache', 'data.json');

function readFromCache (){

  if(!cacheEnabled){
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    fs.readFile(filePath,'utf8', (err,data) => {
      if(err){
        reject("Unable to read file from cache");
      } else {
        resolve(parseCachedFile(data));
      }
    });
  });
}

function parseCachedFile(data){

  console.log("parseCachedFile");

  if(data) {
    try {
      data = JSON.parse(data);
      data.source = 'disk';
      return data;
    } catch (error) {
      throw "Unable to parse JSON received from server " + error;
    }
  }
}

function getDataFromServer(){
  console.log("getDataFromServer");
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if(error) { reject("Error in getDataFromServer: " + error); }
      try {
        var data = JSON.parse(body);
        data.source = 'server';
        if(data.success){
            jsonfile.writeFile(filePath,data);            
            resolve(data);
        }
      } 
      catch(error) {
        reject("Error loading data from server " + error);
      }
    })
  });
};


module.exports = {

  load : function () {
      return readFromCache()
              .then(data => data || getDataFromServer())
              .then(data => { return {
                source : data.source,
                arrivals : data.data.arrivals,
                departures : data.data.departures
              }})
              .catch(e => console.log(e));
  }
}
