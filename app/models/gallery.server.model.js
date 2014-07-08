/**
 * History
 * */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
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
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

var showSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    airsDayofWeek: String,
    airsTime: String,
    firstAired: Date,
    genre: [String],
    network: String,
    overview: String,
    rating: Number,
    ratingCount: Number,
    status: String,
    poster: String,
    subscribers: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }],
    episodes: [{
        season: Number,
        episodeNumber: Number,
        episodeName: String,
        firstAired: Date,
        overview: String
    }]
});

mongoose.model('Gallery', GallerySchema);