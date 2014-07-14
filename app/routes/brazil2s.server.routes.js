'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var brazil2s = require('../../app/controllers/brazil2s');

	// Brazil2s Routes
	app.route('/brazil2s')
		.get(brazil2s.list)
		.post(users.requiresLogin, brazil2s.create);

	app.route('/brazil2s/:brazil2Id')
		.get(brazil2s.read)
		.put(users.requiresLogin, brazil2s.hasAuthorization, brazil2s.update)
		.delete(users.requiresLogin, brazil2s.hasAuthorization, brazil2s.delete);

	// Finish by binding the Brazil2 middleware
	app.param('brazil2Id', brazil2s.brazil2ByID);
};