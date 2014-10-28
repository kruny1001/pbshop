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

var googleapis = require('googleapis');


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
exports.readGWT = function(req, res) {
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
    res.send('test');
    /*
    Product.findById(id).populate('user', 'displayName').exec(function(err, product) {
        if (err) return next(err);
        if (! product) return next(new Error('Failed to load product ' + id));
        result = product ;

    });
    */
};

exports.productByID = function(req, res, next, id){
    Product.findById(id).populate('user', 'displayName').exec(function(err, product) {
        if (err) return next(err);
        if (! product) return next(new Error('[ERROR] Fail to Load product ' + id));
        var d = new Date();
        var iat = d.getTime();
        var exp = new Date(2022, 11, 31).getTime();
        var template = {
            "iss":"08243362007174700466",
            "aud":"Google",
            "typ":"google/payments/inapp/item/v1",
            "iat": iat,
            "exp": exp,
            "request":{
                "currencyCode":"USD",
                "price":product.price.toString(),
                "name":product.name,
                "sellerData":product.user.displayName,
                "description":product.description
            }
        }
        var token = jwt.sign(template, '80oij1i2QxEJmI8tA7T-Fg');
        //console.log(token);
        res.header('Content-Type', 'application/json; charset=utf-8');
        res.jsonp([token]);
        //TODO: here need to set Google Walllet json format
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