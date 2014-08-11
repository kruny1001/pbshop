/**
 * Created by KevinSo on 8/11/2014.
 */

/**
 * History
 *
 * 8/11/2014
 *
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Menus = mongoose.model('Menus'),
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
                message = 'Menus already exists';
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
    var menu = new Menus(req.body);
    menu.user = req.user;

    menu.save(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(menu);
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
    var menu = req.menu ;

    menu = _.extend(menu , req.body);

    menu.save(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(menu);
        }
    });
};

/**
 * Delete an Gallery
 */

exports.delete = function(req, res) {
    var menu = req.menu ;

    menu.remove(function(err) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(menu);
        }
    });
};

/**
 * List of Galleries
 */

exports.list = function(req, res) {
    Menus.find().sort('-created').populate('user', 'displayName').exec(function(err, menu) {
        if (err) {
            return res.send(400, {
                message: getErrorMessage(err)
            });
        } else {
            res.jsonp(menu);
        }
    });
};

/**
 * Gallery middleware
 */

exports.menusByID = function(req, res, next, id) { Menus.findById(id).populate('user', 'displayName').exec(function(err, menu) {
    if (err) return next(err);
    if (! menu) return next(new Error('Failed to load menu ' + id));
    req.gallery = menu ;
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

