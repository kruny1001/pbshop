'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var galleries = require('../../app/controllers/galleries');

	// Galleries Routes
	app.route('/galleries')
		.get(galleries.list)
		.post(users.requiresLogin, galleries.create);

	app.route('/galleries/:galleryId')
		.get(galleries.read)
		.put(users.requiresLogin, galleries.hasAuthorization, galleries.update)
		.delete(users.requiresLogin, galleries.hasAuthorization, galleries.delete);

/*
    app.route('/api/shows').get(function(req, res, next){
        var query = Show.find();
        if(req.query.genre){
            query.where({genre: req.query.genre});
        } else {
            query.limit(12);
        }
        query.exec(function(err, shows) {
            if(err) return next(err);
            res.send(shows);
        });
    });
*/
    /*
    app.get('/api/shows/:id', function(req, res, next) {
        Show.findById(req.params.id, function(err, show) {
            if (err) return next(err);
            res.send(show);
        });
    });
*/
	// Finish by binding the Gallery middleware
	app.param('galleryId', galleries.galleryByID);
};