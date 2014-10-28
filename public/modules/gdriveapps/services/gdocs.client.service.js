'use strict';

angular.module('gdriveapps').factory('gdocs', [
	function() {
		var gdocs = new GDocs();

		/*
		var dnd = new DnDFileController('body', function(files) {
			var $scope = angular.element(this).scope();
			Util.toArray(files).forEach(function(file, i) {
				gdocs.upload(file, function() {
					//$scope.fetchDocs(true);
				}, true);
			});
		});
		*/
		return gdocs;
	}
]);