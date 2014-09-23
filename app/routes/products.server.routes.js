'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var products = require('../../app/controllers/products');
    var banners = require('../../app/controllers/banners');

	// Products Routes
	app.route('/products')
		.get(products.list)
		.post(users.requiresLogin, products.create);
	
	app.route('/products/:productId')
		.get(products.read)
		.put(users.requiresLogin, products.hasAuthorization, products.update)
	    .delete(users.requiresLogin, products.hasAuthorization, products.delete);

    app.route('/products/list/:bannerId')
        .get(products.listByParentId);

	// Finish by binding the Product middleware
	app.param('productId', products.productByID);

    app.param('bannerId', banners.bannerByID);
};