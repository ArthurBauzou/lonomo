var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('results', { title: 'Lonomo' });
});

module.exports = router;