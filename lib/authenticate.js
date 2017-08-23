var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
var Config = require('../config');

router.use(function(req,res,next){
	var token = req.body.token || req.headers['x-access-token'];

	if(token){
		jwt.verify(token, Config.secret, function(err, decoded){
			if(err){
				res.json({
					success: false,
					message: "Token invalide"
				});
			}
			else {
				next();
			}
		});
	}
	else {
		res.status(403).send({
			sucess: false,
			message: "pas de token"
		})
	}
})

module.exports = router;