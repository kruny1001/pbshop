'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Gdriveapp = mongoose.model('Gdriveapp'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Gdriveapp already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Gdriveapp
 */
exports.create = function(req, res) {
	var gdriveapp = new Gdriveapp(req.body);
	gdriveapp.user = req.user;

	gdriveapp.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(gdriveapp);
		}
	});
};

/**
 * Show the current Gdriveapp
 */
exports.read = function(req, res) {
	res.jsonp(req.gdriveapp);
};

/**
 * Update a Gdriveapp
 */
exports.update = function(req, res) {
	var gdriveapp = req.gdriveapp ;

	gdriveapp = _.extend(gdriveapp , req.body);

	gdriveapp.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(gdriveapp);
		}
	});
};

/**
 * Delete an Gdriveapp
 */
exports.delete = function(req, res) {
	var gdriveapp = req.gdriveapp ;

	gdriveapp.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(gdriveapp);
		}
	});
};

/**
 * List of Gdriveapps
 */
exports.list = function(req, res) { Gdriveapp.find().sort('-created').populate('user', 'displayName').exec(function(err, gdriveapps) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(gdriveapps);
		}
	});
};

/**
 * Gdriveapp middleware
 */
exports.gdriveappByID = function(req, res, next, id) { Gdriveapp.findById(id).populate('user', 'displayName').exec(function(err, gdriveapp) {
		if (err) return next(err);
		if (! gdriveapp) return next(new Error('Failed to load Gdriveapp ' + id));
		req.gdriveapp = gdriveapp ;
		next();
	});
};

/**
 * Gdriveapp authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.gdriveapp.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};