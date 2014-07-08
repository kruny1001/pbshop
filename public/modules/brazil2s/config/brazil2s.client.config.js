'use strict';

// Configuring the Articles module
angular.module('brazil2s').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Brazil2s', 'brazil2s', 'dropdown', '/brazil2s(/create)?');
		Menus.addSubMenuItem('topbar', 'brazil2s', 'List Brazil2s', 'brazil2s');
		Menus.addSubMenuItem('topbar', 'brazil2s', 'New Brazil2', 'brazil2s/create');
	}
]);