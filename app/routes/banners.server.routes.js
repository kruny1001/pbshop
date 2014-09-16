'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var banners = require('../../app/controllers/banners');

	// Banners Routes
	app.route('/banners')
		.get(banners.list)
		.post(users.requiresLogin, banners.create);

	app.route('/banners/:bannerId')
		.get(banners.read)
		.put(users.requiresLogin, banners.hasAuthorization, banners.update)
		.delete(users.requiresLogin, banners.hasAuthorization, banners.delete);

	// Finish by binding the Banner middleware
	app.param('bannerId', banners.bannerByID);
};