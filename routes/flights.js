var express = require('express');
var router = express.Router();
var bhx = require('../bhx');

var options = {
  uri: 'https://www.birminghamairport.co.uk/Api/FidApi/GetFlights',
  body: require('../bhx/request-body'),
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded','accept' : 'application/json'
  }
};

router.get('/', (req, res) => {
  bhx.load(data => res.json(data));
});

router.get('/arrivals',(req, res) => {
  bhx.load((err, data) => {
    delete data.departures;
    res.json(data.arrivals);
  });
});

router.get('/departures',(req, res) => {
  bhx.load((err, data) => {
    delete data.arrivals;
    res.json(data);
  });
});

module.exports = router;
