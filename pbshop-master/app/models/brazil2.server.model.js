'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Brazil2 Schema
 */
var Brazil2Schema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Brazil2 name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Brazil2', Brazil2Schema);