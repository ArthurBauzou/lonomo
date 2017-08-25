var express = require('express')
var router = express.Router()
var request = require('request')

// var bodyParser = require('body-parser');
// var app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

router.post('/', (req, res, next)=> {

  console.log(req.body)

  request.post({url:"http://localhost:3000/apis", form: req.body}, (err, httpResponse, data)=> {
    superdata = {"tags": JSON.parse(data)}
    superdata.title = 'results'
    console.log(superdata)

    res.render('results', superdata)
    console.log('ici c paris')
  })
  
})

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

module.exports = router