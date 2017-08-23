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



/* Get the user */
router.get('/', function(req, res, next) {

    var id_user = 1;    //à modifier
  
    var getUser = function(retfunc){
        connection.query('SELECT * FROM lnm_users WHERE id_user = ?', [id_user], function(error, results, fields) {
            if(error) res.send(error);
            else retfunc(results);
        });
    }

    getUser(function(results) {
        res.json(results);
    });    

});



/* Post the user */
router.put('/', function(req, res, next) {

 //   var id_user = 1;    //à modifier

   
    var id = 1; //à modifier
	
	var nom = req.body.nom;
	var prenom = req.body.prenom;
	var email = req.body.email;
	var password = req.body.password;
	
    
   var getUser = function(retfunc){
        
        var data = {
            
            fname_user    : nom,         //à modifier
            lname_user : prenom,         //à modifier
            mail_user   : email,         //à modifier
            password_user   : password   //à modifier
        
        };
        
        connection.query("UPDATE lnm_users set ? WHERE id_user = ? ",[data,id], function(error,results, rows)	{
            if(error) res.send(error);
            else retfunc(results);
        });
    }

    getUser(function(results) {
        res.json(results);
    });    

});


/* Add a new user */
router.post('/', function(req, res, next) {

  
    var postUser = function(retfunc){
        connection.query('INSERT INTO lnm_users (fname_user, lname_user, mail_user, password_user) VALUES (?, ?, ?, ?)', [req.body.nom, req.body.prenom, req.body.email, req.body.password], function(error, results, fields) {
            if(error) res.send(error);
            else retfunc(results);
        });
    }

    postUser(function(results) {
        res.json(results);
    });    

});


/* Delete a user */
router.delete('/', function(req, res, next) {

    var id_user = 9;    //à modifier
  
    var delUser = function(retfunc){
        connection.query('DELETE FROM lnm_users WHERE id_user = ?', [id_user], function(error, results, fields) {
            if(error) res.send(error);
            else retfunc(results);
        });
    }

    delUser(function(results) {
        res.json(results);
    });    

});


module.exports = router;