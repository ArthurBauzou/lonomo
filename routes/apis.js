var express = require('express');
var router = express.Router();
var request=require('request');
var utf8 = require('utf8');



/* Get the user's history */
router.post('/', function(req, res, next) {

    var depart = req.body.departure;
    var arriv = req.body.arrival;

    var walking = req.body.walking;
    var driving = req.body.driving;
    var bicycling = req.body.bicycling;
    var transit = req.body.transit;


    var parsej ="";
    var results = {};

    depart = utf8.encode(depart.replace(/\s/g, '+'));
    arriv = utf8.encode(arriv.replace(/\s/g, '+'));

    var reqApi = function(mode, retourFunc){
        
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


                if(mode == "bicycling") results["bicycling"] = true;
                if(mode == "walking") results["walking"] = true;
                

                if(mode == "transit"){
                    results["transit"] = true;
                    results["arrival_time"] = parsej["routes"][0]["legs"][0]["arrival_time"];
                    results["departure_time"] = parsej["routes"][0]["legs"][0]["departure_time"];

                    if(parsej["routes"][0]["fare"]) results["tarifs"] = parsej["routes"][0]["fare"]["text"];
                    else results["tarifs"] = "0,00 €"
                }

                if(mode == "driving"){
                    results["driving"] = true;
                    results["tarifs"] = (results["distance"].value/1000*0.11).toFixed(2)+" €" //calcul approximatif du cout en carburant
                }

                var altFunc = function(retFunc){
                        
                    if(mode=="walking"||mode=="bicycling"){
                        results["altitude"] = {};
                        var coords = [];
                        var altFunc;
                        var url=results["start_location"]["lat"]+","+results["start_location"]["lng"];
                        
                        coords = parsej["routes"][0]["legs"][0]["steps"]
                        
                        for(var elt =0; elt<coords.length;elt++){
                            url += "|"+coords[elt]["end_location"]["lat"]+","+coords[elt]["end_location"]["lng"]
                        }
                                            
                    
                        request('https://maps.googleapis.com/maps/api/elevation/json?locations='+url+'&key=AIzaSyBy94XeHduKyseqtx3gu9tHCQXwBz9qvG8', function (error, response, body_elev){
                            var parselev = JSON.parse(body_elev);

                            parselev = parselev["results"];
                            elevation = 0;

                            for(var elt = 1; elt<parselev.length;elt++){
                                tmpElev = parselev[elt]["elevation"]-parselev[elt-1]["elevation"];
                                if( tmpElev > 0 ){
                                    elevation += tmpElev;
                                }
                            }
                            
                            retFunc(elevation.toFixed(0));
                        })
                    
                    }
                    else retFunc(0);
                }


                altFunc(function(resultat){
                    results["altitude"] = resultat;
                    retourFunc(results);
                });
            }
            else {
                results["no_results"] = "Aucun resultat disponible pour ce moyen de transport";
                retourFunc(results);
            }
        
        });

    }

    
    var resultApi = [];

    reqApi("walking", function(resultsWalk){
        reqApi("driving", function(resultsDriv){
            reqApi("bicycling", function(resultsBicy){
                reqApi("transit", function(resultsTrans){
                    if(driving){
                        resultApi.push(resultsDriv)
                    }
                    if(walking){
                        resultApi.push(resultsWalk)
                    }
                    if(transit){
                        resultApi.push(resultsTrans)
                    }
                    if(bicycling){
                        resultApi.push(resultsBicy)
                    }
                    res.send(resultApi);
                })
            })
        })
    })
    

});

module.exports = router;
