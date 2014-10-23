/**
 * Created by Kevin on 2014-10-23.
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Product = mongoose.model('Product'),
    _ = require('lodash');

/*
    Module dependencies for custom
 */
var jwt = require('jsonwebtoken');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
    var message = '';

    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Review already exists';
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
 * Show the current Review
 */
exports.read = function(req, res) {
    var d = new Date();
    var iat = d.getTime();
    var exp = new Date(2022, 11, 31).getTime();
    var product = {
        "iss":"08243362007174700466",
        "aud":"Google",
        "typ":"google/payments/inapp/item/v1",
        "iat": iat,
        "exp": exp,
        "request":{
            "currencyCode":"USD",
            "price":"3.00",
            "name":"Gold Star",
            "sellerData":"some opaque data",
            "description":"A shining badge of distinction"
        }
    }
    Review.findById(id).populate('user', 'displayName').exec(function(err, product) {
        if (err) return next(err);
        if (! product) return next(new Error('Failed to load product ' + id));
        //res.jsonp(product) = review ;
        next();
    });
    //res.jsonp(product);

};

/**
 * Review middleware
 */
exports.reviewByID = function(req, res, next, id) { Review.findById(id).populate('user', 'displayName').exec(function(err, review) {
    if (err) return next(err);
    if (! review) return next(new Error('Failed to load Review ' + id));
    req.review = review ;
    next();
});
};

/**
 * Review authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.review.user.id !== req.user.id) {
        return res.send(403, 'User is not authorized');
    }
    next();
};