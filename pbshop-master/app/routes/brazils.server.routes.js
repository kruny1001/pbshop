'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var brazils = require('../../app/controllers/brazils');

	// Brazils Routes
	app.route('/brazils')
		.get(brazils.list)
		.post(users.requiresLogin, brazils.create);

	app.route('/brazils/:brazilId')
		.get(brazils.read)
		.put(users.requiresLogin, brazils.hasAuthorization, brazils.update)
		.delete(users.requiresLogin, brazils.hasAuthorization, brazils.delete);

	// Finish by binding the Brazil middleware
	app.param('brazilId', brazils.brazilByID);
};