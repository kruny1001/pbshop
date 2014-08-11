/**
 * Created by KevinSo on 8/11/2014.
 */

'use strict';

module.exports = function(app) {
    var users = require('../../app/controllers/users');
    var menus = require('../../app/controllers/menu');

    // Galleries Routes
    app.route('/menus')
        .get(menus.list) // working
        .post(menus.create); // working

    app.route('/menus/:menusId')
        .get(menus.read)
        .put(users.requiresLogin, menus.hasAuthorization, menus.update)
        .delete(users.requiresLogin, menus.hasAuthorization, menus.delete);

    // Finish by binding the Menu middleware
    app.param('menusId', menus.menusByID);
};