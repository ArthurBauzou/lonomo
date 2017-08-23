var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
	host : 'localhost', // à renseigner
	user : 'root', // à renseigner
	password : '', // à renseigner
	database : 'DB_lostnomore' // à renseigner
});


connection.connect();



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


/* Add a new item to the history */
router.post('/', function(req, res, next) {

    var id_user = 2;    //à modifier
  
    var postHistory = function(retfunc){
        connection.query('INSERT INTO lnm_historic (depart_historic, arriv_historic, user_historic) VALUES (?, ?, ?)', [req.body.depart, req.body.arriv, id_user], function(error, results, fields) {
            if(error) res.send(error);
            else retfunc(results);
        });
    }

    postHistory(function(results) {
        res.json(results);
    });    

});


/* Add a new item to the history */
router.delete('/', function(req, res, next) {

    var id_user = 2;    //à modifier
  
    var delHistory = function(retfunc){
        connection.query('DELETE FROM lnm_historic WHERE user_historic = ?', [id_user], function(error, results, fields) {
            if(error) res.send(error);
            else retfunc(results);
        });
    }

    delHistory(function(results) {
        res.json(results);
    });    

});


module.exports = router;
