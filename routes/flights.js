var express = require('express');
var router = express.Router();
var bhx = require('../bhx');

router.get('/', (req, res) => {
  bhx.load(data => res.json(data));
});

router.get('/arrivals',(req, res) => {
  bhx.load((err, data) => {
    if(!err) {
      delete data.departures;
      res.json(data);
    }
  });
});

router.get('/departures',(req, res) => {
  bhx.load((err, data) => {
    if(!err) {
      delete data.arrivals;
      res.json(data);
    }
  });
});

module.exports = router;
