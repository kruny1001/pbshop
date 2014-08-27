'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Article = mongoose.model('Article'),
    _ = require('lodash');

/**
 * Create a Gwas datum
 */
exports.create = function(req, res) {

};

/**
 * Show the current Gwas datum
 */
exports.read = function(req, res) {
    res.jsonp({title:'GWAS Data porting service', body:'This is a contents of the porting GWAS data.'});
};

/**
 * Getting Started
 */
exports.getStart = function(req, res) {

    Article.find().sort('-created').populate('user', 'displayName').exec(function(err, galleries) {
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
 * Update a Gwas datum
 */
exports.update = function(req, res) {

};

/**
 * Delete an Gwas datum
 */
exports.delete = function(req, res) {

};

/**
 * List of Gwas data
 */
exports.list = function(req, res) {

};