'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var gdriveapps = require('../../app/controllers/gdriveapps');

	// Gdriveapps Routes
	app.route('/gdriveapps')
		.get(gdriveapps.list)
		.post(users.requiresLogin, gdriveapps.create);

	app.route('/gdriveapps/:gdriveappId')
		.get(gdriveapps.read)
		.put(users.requiresLogin, gdriveapps.hasAuthorization, gdriveapps.update)
		.delete(users.requiresLogin, gdriveapps.hasAuthorization, gdriveapps.delete);

	// Finish by binding the Gdriveapp middleware
	app.param('gdriveappId', gdriveapps.gdriveappByID);
};