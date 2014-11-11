'use strict';

module.exports = function(app) {
	var users = require('../../../app/controllers/users');
	var payments = require('../../../app/controllers/payments/payments');

	// Payments Routes
	app.route('/payments')
		.get(payments.list)
		.post(users.requiresLogin, payments.create);

	app.route('/payments/:sellerData')
		.get(payments.read)

	app.route('/payments/:paymentId')
		.get(payments.read)
		.put(users.requiresLogin, payments.hasAuthorization, payments.update)
		.delete(users.requiresLogin, payments.hasAuthorization, payments.delete);

	// Finish by binding the Payment middleware
	app.param('paymentId', payments.paymentByID);
	app.param('sellerData', payments.paymentsBySellerData);
};