var request = require('request');
var jsonfile = require('jsonfile');
var fs = require('fs');
var cacheEnabled = true;

var filePath = process.cwd() + '\\cache\\data.json';
var arrivals = [];
var departures = [];

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
