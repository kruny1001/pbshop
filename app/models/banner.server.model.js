'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Banner Schema
 */
var BannerSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Banner name',
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

mongoose.model('Banner', BannerSchema);