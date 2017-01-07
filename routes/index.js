var express = require('express');
var router = express.Router();

router.get('/', (req, res) => res.render('index', { title: 'Express' }));

router.get('/test', (req, res) => res.json(require('../scratch')));

module.exports = router;
