'use strict';

var gwas = require('../../app/controllers/gwas-data');

module.exports = function(app) {
	// Routing logic   
	// ...
    // Article Routes
    app.route('/gwas-data/getstarted')
        .get(gwas.getStart)
        //.post(users.requiresLogin, articles.create);

    app.route('/gwas-data/:articleId')
        .get(gwas.read)
        //.put(users.requiresLogin, articles.hasAuthorization, articles.update)
        //.delete(users.requiresLogin, articles.hasAuthorization, articles.delete);

    // Finish by binding the article middleware
    //app.param('articleId', articles.articleByID);
};