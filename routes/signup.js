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
router.get("/", function(req, res){
	res.render('signup');
})


module.exports = router;
