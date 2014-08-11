/**
 * Created by KevinSo on 8/11/2014.
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Menus Schema
 */
var MenusSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please fill Menu name',
        trim: true
    },
    happy: String,
    body: String,
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Menus', MenusSchema);