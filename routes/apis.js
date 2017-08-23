var express = require('express');
var router = express.Router();
var request=require('request');



/* Get the user's history */
router.post('/', function(req, res, next) {

    var depart = req.body.departure;
    var arriv = req.body.arrival;
    var mode = req.body.mode;

    depart = depart.replace(/\s/g, '+');
    arriv = arriv.replace(/\s/g, '+');

    console.log('depart : '+depart+' - arrivee : '+arriv);

    request('https://maps.googleapis.com/maps/api/directions/json?mode='+mode+'&origin='+depart+'&destination='+arriv+'&language=fr&key=AIzaSyBy94XeHduKyseqtx3gu9tHCQXwBz9qvG8', function (error, response, body) {
        var parsej = JSON.parse(body);

        


        res.send(parsej);
    });

});



module.exports = router;
