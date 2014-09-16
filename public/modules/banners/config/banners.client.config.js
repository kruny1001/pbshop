'use strict';

// Configuring the Articles module
angular.module('banners').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Banners', 'banners', 'dropdown', '/banners(/create)?');
		Menus.addSubMenuItem('topbar', 'banners', 'List Banners', 'banners');
		Menus.addSubMenuItem('topbar', 'banners', 'New Banner', 'banners/create');
	}
]);