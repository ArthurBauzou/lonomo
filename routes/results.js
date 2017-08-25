var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  
  res.render('results', {
    title: 'Lonomo',
    tags: [
      {
        duration: '2h15',
        distance: 12.3,
        walking: true
      },
      {
        duration: '0h53',
        distance: 13.9,        
        bicycle: true
      },
      {
        duration: '0h15',
        distance: 14.0,        
        transit: true
      }
    ]
  });
});

module.exports = router;