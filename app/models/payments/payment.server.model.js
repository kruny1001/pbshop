'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Payment Schema
 */
var PaymentSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Payment name',
		trim: true
	},
	price:{
		type: Number,
		required: 'Please fill Payment price',
		default: 0
	},
	description:{
		type: String,
		default: ''
	},
	currencyCode:{
		type: String,
		default: 'KRW'
	},
	sellerData:{
		type: String,
		default: ''
	},
	orderID:{
		type: String,
		default: ''
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

mongoose.model('Payment', PaymentSchema);