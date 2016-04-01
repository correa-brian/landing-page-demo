var express = require('express');
var router = express.Router();
var Profile = require('../models/Profile');

router.get('/:resource', function(req, res, next) {
	var resource = req.params.resource;
	var queryParams = req.query;

	if (resource == 'profile'){
		Profile.find(queryParams, function(err, profiles){
			if(err){
				var errorMsg = {
					confirmation: 'fail',
					message: err
				}

				res.json(errorMsg);
				return;
			}

			var list = [];
			for (var i=0; i <profiles.length; i++){
				var p = profiles[i];
				list.push(p.summary());
			}

			var results = {
				confirmation: 'success',
				profiles: list
			}

			res.json(results);
		})

		return;	
	}

	var errorMsg = {
		confirmation: 'fail',
		message: 'Invalid Resource'
	}

	res.json(errorMsg);
});

router.get('/:resource/:id', function(req, res, next) {
	var resource = req.params.resource;
	var id = req.params.id;

	if (resource == 'profile'){
		Profile.findById(id, function(err, profile){
			if (err){
				var errorMsg = {
					confirmation: 'fail',
					message: 'Profile not found.'
				}

				res.json(errorMsg);
				return;
			}

			if (profile == null) {
				var errorMsg = {
					confirmation: 'fail',
					message: 'Profile not found.'
				}

				res.json(errorMsg);
				return;
			}

			var results = {
				confirmation: 'success',
				profile: profile.summary()
			}

			res.json(results);
		});

		return;
	}
});

module.exports = router;

