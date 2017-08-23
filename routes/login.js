var express = require('express');
var router = express.Router();
var mysql = require('mysql');
//var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');
var Config = require('../config');

var connection = mysql.createConnection({
	host : 'localhost', // à renseigner
	user : 'root', // à renseigner
	password : '', // à renseigner
	database : 'DB_lostnomore' // à renseigner
});


connection.connect();



/* GET auth listing. */
router.post("/", function(req, res){

	connection.query('SELECT id_user, password_user FROM lnm_users WHERE mail_user = ?', [req.body.login], function(error, user, fields) {

        if(error) res.send(error);
        
		if(!user){
			res.send('Email invalide');
		}
		else if(user){
			//bcrypt.compare(req.body.password, user.password, function(err, result) {
            
  			  if (user[0].password_user != req.body.password){
					res.send('Mot de passe invalide');
				}
				else {
					var token = jwt.sign({
						exp: Math.floor(Date.now() / 1000) + 60,
						data: user
					}, Config.secret);

					res.json({
						success: true,
						message: "connecté",
						token: token
					})
				}
			//});
			
		}
    })
    
})

module.exports = router;
