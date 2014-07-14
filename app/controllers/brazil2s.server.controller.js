'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Brazil2 = mongoose.model('Brazil2'),
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
				message = 'Brazil2 already exists';
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
 * Create a Brazil2
 */
exports.create = function(req, res) {
	var brazil2 = new Brazil2(req.body);
	brazil2.user = req.user;

	brazil2.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(brazil2);
		}
	});
};

/**
 * Show the current Brazil2
 */
exports.read = function(req, res) {
	res.jsonp(req.brazil2);
};

/**
 * Update a Brazil2
 */
exports.update = function(req, res) {
	var brazil2 = req.brazil2 ;

	brazil2 = _.extend(brazil2 , req.body);

	brazil2.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(brazil2);
		}
	});
};

/**
 * Delete an Brazil2
 */
exports.delete = function(req, res) {
	var brazil2 = req.brazil2 ;

	brazil2.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(brazil2);
		}
	});
};

/**
 * List of Brazil2s
 */
exports.list = function(req, res) { Brazil2.find().sort('-created').populate('user', 'displayName').exec(function(err, brazil2s) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(brazil2s);
		}
	});
};

/**
 * Brazil2 middleware
 */
exports.brazil2ByID = function(req, res, next, id) { Brazil2.findById(id).populate('user', 'displayName').exec(function(err, brazil2) {
		if (err) return next(err);
		if (! brazil2) return next(new Error('Failed to load Brazil2 ' + id));
		req.brazil2 = brazil2 ;
		next();
	});
};

/**
 * Brazil2 authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.brazil2.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};