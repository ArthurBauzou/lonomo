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

    request('https://maps.googleapis.com/maps/api/directions/json?mode='+mode+'&origin='+depart+'&destination='+arriv+'&language=fr&key=AIzaSyBy94XeHduKyseqtx3gu9tHCQXwBz9qvG8', function (error, response, body) {
        var parsej = JSON.parse(body);

        var results = parsej;
        var results = {};

        if(parsej["routes"][0]){

            results["distance"] = parsej["routes"][0]["legs"][0]["distance"];
            results["duration"] = parsej["routes"][0]["legs"][0]["duration"];
            results["end_address"] = parsej["routes"][0]["legs"][0]["end_address"];
            results["end_location"] = parsej["routes"][0]["legs"][0]["end_location"];
            results["start_address"] = parsej["routes"][0]["legs"][0]["start_address"];
            results["start_location"] = parsej["routes"][0]["legs"][0]["start_location"];

            if(mode == "transit"){
                results["arrival_time"] = parsej["routes"][0]["legs"][0]["arrival_time"];
                results["departure_time"] = parsej["routes"][0]["legs"][0]["departure_time"];
                results["tarifs"] = parsej["routes"][0]["fare"]["text"];
            }

            if(mode == "driving"){
                results["tarifs"] = (results["distance"].value/1000*0.11).toFixed(2) //calcul approximatif du cout en carburant
            }

        }
        else {
            results["no_results"] = "Aucun resultat disponible pour ce moyen de transport";
        }

        res.send(results);
    });

});



module.exports = router;
