'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Brazil Schema
 */
var BrazilSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Brazil name',
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

mongoose.model('Brazil', BrazilSchema);