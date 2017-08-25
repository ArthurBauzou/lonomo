var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var request=require('request');
var Cookies = require( "cookies" );
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





router.get('/', function(req, res, next) {
  res.render('login', { title: 'Lonomo' });
});


router.get('/random', function(req, res, next){
	res.send(new Cookies(req,res).get( 'access_token' ))
})


router.post('/trylogin', function(req,res,next){
	
	request.post({url:'http://localhost:3000/login', form: {login:req.body.login, password:req.body.password}}, function(err,httpResponse,body){
		var parsebody = JSON.parse(body);
		
		new Cookies(req,res).set('access_token',parsebody.token);

		res.redirect('/');
	})
})




/* GET auth listing. */
router.post("/", function(req, res){


	connection.query('SELECT id_user, password_user FROM lnm_users WHERE mail_user = ?', [req.body.login], function(error, user, fields) {

        if(error) res.send(error);
		if(user.length <= 0){
			res.json({
				success: false,
				message: "Login incorrect"
			})
		}
		else if(user){
			//bcrypt.compare(req.body.password, user.password, function(err, result) {
            
  			  if (user[0].password_user != req.body.password){
				res.json({
					success: false,
					message: "Mot de passe incorrect"
				})
				}
				else {
					var token = jwt.sign({
						exp: Math.floor(Date.now() / 1000) + 60*60,
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
