var express = require('express');
var router = express.Router();
var request=require('request');



/* Get the user's history */
router.get('/', function(req, res, next) {

    var id_user = 1;    //à modifier
  
    var getHistory = function(retfunc){
        connection.query('SELECT * FROM lnm_historic WHERE user_historic = ?', [id_user], function(error, results, fields) {
            if(error) res.send(error);
            else retfunc(results);
        });
    }

    getHistory(function(results) {
        res.json(results);
    });    

});



module.exports = router;
