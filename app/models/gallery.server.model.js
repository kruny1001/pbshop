'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Gallery Schema
 */
var GallerySchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Gallery name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
    content: {
        type: String,
        default: '',
        trim: true
    },
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Gallery', GallerySchema);