'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Brazil = mongoose.model('Brazil'),
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
				message = 'Brazil already exists';
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
 * Create a Brazil
 */
exports.create = function(req, res) {
	var brazil = new Brazil(req.body);
	brazil.user = req.user;

	brazil.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(brazil);
		}
	});
};

/**
 * Show the current Brazil
 */
exports.read = function(req, res) {
	res.jsonp(req.brazil);
};

/**
 * Update a Brazil
 */
exports.update = function(req, res) {
	var brazil = req.brazil ;

	brazil = _.extend(brazil , req.body);

	brazil.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(brazil);
		}
	});
};

/**
 * Delete an Brazil
 */
exports.delete = function(req, res) {
	var brazil = req.brazil ;

	brazil.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(brazil);
		}
	});
};

/**
 * List of Brazils
 */
exports.list = function(req, res) { Brazil.find().sort('-created').populate('user', 'displayName').exec(function(err, brazils) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(brazils);
		}
	});
};

/**
 * Brazil middleware
 */
exports.brazilByID = function(req, res, next, id) { Brazil.findById(id).populate('user', 'displayName').exec(function(err, brazil) {
		if (err) return next(err);
		if (! brazil) return next(new Error('Failed to load Brazil ' + id));
		req.brazil = brazil ;
		next();
	});
};

/**
 * Brazil authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.brazil.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};