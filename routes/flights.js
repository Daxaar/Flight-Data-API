var express = require('express');
var router = express.Router();
var bhx = require('../bhx');

router.get('/', (req, res) => {
  bhx.load(data => res.json(data));
});

router.get('/arrivals',(req, res) => {

  bhx.getArrivals( toBoolean(req.query.cache) )
    .then(data => res.json(data))
    .catch(error => res.send("Broken: " + error));

});

router.get('/departures?',(req, res) => {

  bhx.getDepartures( toBoolean(req.query.cache) )
    .then(data => res.json(data))
    .catch(error => res.send("Broken: " + error));

});

function toBoolean(param){
  return param == "true" || param == "1";
}

module.exports = router;
