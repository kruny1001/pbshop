'use strict';

// Configuring the Articles module
angular.module('galleries').run(['Menus',
	function(Menus) {
		// Set top bar menu items
        //Menus.addMenuItem(menuId, menuItemTitle, menuItemURL, [menuItemUIRoute], [isPublic], [roles]);
        Menus.addMenuItem('topbar', 'Galleries', 'galleries', 'dropdown', '/galleries(/create)?');

        //Menus.addSubMenuItem(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, [menuItemUIRoute], [isPublic], [roles]);
		Menus.addSubMenuItem('topbar', 'galleries', 'List Galleries', 'galleries');
        Menus.addSubMenuItem('topbar', 'galleries', 'View Test', 'galleries/test');
		Menus.addSubMenuItem('topbar', 'galleries', 'New Gallery', 'galleries/create');


	}
]);