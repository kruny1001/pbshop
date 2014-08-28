'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Board Schema
 */
var BoardSchema = new Schema({
    boarderName:{
        type: String
    },
    contentNum:{
        type: String,
        unique: true,
        trim:true
    },
    title:{
        type: String,
        trim: true
    },
    created:{
        type: Date,
        default: Date.now
    },
    author:{
        type: String
        //ref: 'User'
    },
    body:{
        type: String
    },

    comments:{
        type: String
    }

});

mongoose.model('Board', BoardSchema);