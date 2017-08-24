var express = require('express');
var router = express.Router();
var request=require('request');



/* Get the user's history */
router.post('/', function(req, res, next) {

    var depart = req.body.departure;
    var arriv = req.body.arrival;
    var mode = req.body.mode;
    var parsej ="";
    var results = {};

    depart = depart.replace(/\s/g, '+');
    arriv = arriv.replace(/\s/g, '+');

    request('https://maps.googleapis.com/maps/api/directions/json?mode='+mode+'&origin='+depart+'&destination='+arriv+'&language=fr&key=AIzaSyBy94XeHduKyseqtx3gu9tHCQXwBz9qvG8', function (error, response, body) {
        parsej = JSON.parse(body);

        var results = parsej;
        var results = {};

        if(parsej["routes"][0]){

            results["distance"] = parsej["routes"][0]["legs"][0]["distance"];
            results["duration"] = parsej["routes"][0]["legs"][0]["duration"];
            results["end_address"] = parsej["routes"][0]["legs"][0]["end_address"];
            results["start_address"] = parsej["routes"][0]["legs"][0]["start_address"];
            results["end_location"] = parsej["routes"][0]["legs"][0]["end_location"];
            results["start_location"] = parsej["routes"][0]["legs"][0]["start_location"];
            results["altitude"] = {};

            if(mode == "transit"){
                results["arrival_time"] = parsej["routes"][0]["legs"][0]["arrival_time"];
                results["departure_time"] = parsej["routes"][0]["legs"][0]["departure_time"];
                results["tarifs"] = parsej["routes"][0]["fare"]["text"];
            }

            if(mode == "driving"){
                results["tarifs"] = (results["distance"].value/1000*0.11).toFixed(2) //calcul approximatif du cout en carburant
            }

          /* if(mode=="walking"||mode=="bicycling"){
                var coords = [];
                var altFunc;
                var url=results["start_location"]["lat"]+","+results["start_location"]["lng"];
                
                coords = parsej["routes"][0]["legs"][0]["steps"]
                
                for(var elt =0; elt<coords.length;elt++){
                    url += "|"+coords[elt]["end_location"]["lat"]+","+coords[elt]["end_location"]["lng"]
                }
                
                
                var altFunc = function(retFunc){
            request('https://maps.googleapis.com/maps/api/elevation/json?locations='+url+'&key=AIzaSyBy94XeHduKyseqtx3gu9tHCQXwBz9qvG8', function (error, response, body_elev){
                        var parselev = JSON.parse(body_elev);
                        
                        retFunc(parselev);
                    })
                }

                altFunc(function(resultat){
                    console.log(resultat);
                    results["altitude"] = resultat;
                })
            
            }*/

        }
        else {
            results["no_results"] = "Aucun resultat disponible pour ce moyen de transport";
        }

        res.send(results);
    });

});

module.exports = router;
