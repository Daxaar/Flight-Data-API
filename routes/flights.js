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
      res.json(parse(data));
    }
  });
});

router.get('/departures',(req, res) => {
  bhx.load((err, data) => {
    if(!err) {
      delete data.arrivals;
      res.json(parse(data));
    }
  });
});

module.exports = router;
