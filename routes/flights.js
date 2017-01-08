var express = require('express');
var router = express.Router();
var bhx = require('../bhx');
var parse = require('../bhx/parser');

router.get('/', (req, res) => {
  bhx.load(data => res.json(data));
});

router.get('/arrivals',(req, res) => {
  bhx.load((err, data) => {
    if(!err) {
      delete data.departures;
      data.arrivals = parse(data.arrivals); 
      res.json(data);
    }
  });
});

router.get('/departures',(req, res) => {
  bhx.load((err, data) => {
    if(!err) {
      delete data.arrivals;
      data.departures = parse(data.departures); 
      res.json(data);
    }
  });
});

module.exports = router;
