'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Gdriveapp Schema
 */
var GdriveappSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Gdriveapp name',
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

mongoose.model('Gdriveapp', GdriveappSchema);