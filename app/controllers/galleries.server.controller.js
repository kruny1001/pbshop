/**
 * History
 *
 * 7/11/2014
 *
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Gallery = mongoose.model('Gallery'),
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
				message = 'Gallery already exists';
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
 * Create a Gallery
 */
exports.create = function(req, res) {
	var gallery = new Gallery(req.body);
	gallery.user = req.user;

	gallery.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(gallery);
		}
	});
};

/**
 * Show the current Gallery
 */
exports.read = function(req, res) {
	res.jsonp(req.gallery);
};

/**
 * Update a Gallery
 */
exports.update = function(req, res) {
	var gallery = req.gallery ;

	gallery = _.extend(gallery , req.body);

	gallery.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(gallery);
		}
	});
};

/**
 * Delete an Gallery
 */
exports.delete = function(req, res) {
	var gallery = req.gallery ;

	gallery.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(gallery);
		}
	});
};

/**
 * List of Galleries
 */
exports.list = function(req, res) {
    Gallery.find().sort('-created').populate('user', 'displayName').exec(function(err, galleries) {
            if (err) {
                return res.send(400, {
                    message: getErrorMessage(err)
                });
            } else {
                res.jsonp(galleries);
            }
	});
};

/**
 * Gallery middleware
 */
exports.galleryByID = function(req, res, next, id) { Gallery.findById(id).populate('user', 'displayName').exec(function(err, gallery) {
		if (err) return next(err);
		if (! gallery) return next(new Error('Failed to load Gallery ' + id));
		req.gallery = gallery ;
		next();
	});
};

/**
 * Gallery authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.gallery.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};

