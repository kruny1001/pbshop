'use strict';

// Galleries controller
angular.module('galleries').controller('GalleriesController',
    ['$scope', '$stateParams', '$location', 'Authentication', 'Galleries',
	function($scope, $stateParams, $location, Authentication, Galleries ) {
		$scope.authentication = Authentication;

        $scope.examples = [
            { name: 'Example One',
                content:'<p style="">Pic 1</p><p style=""><img style="height: 103px; width: 118px; position: relative; margin: 0px; resize: none; zoom: 1; display: inline-block; padding: 2px; top: 0px; left: 0px; float: none;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSObpe9xATvc5SpkrWEtGS5ZWlSxmSjHhV3yIE604Arh3aoANOyJPAuGSc" title="" class=""></p><p style="">Pic 2</p><p style=""><img style="height: 130px; width: 117px; position: relative; margin: 0px; resize: none; zoom: 1; display: inline-block; top: 0px; left: 0px; padding: 3px;" src="http://stylonica.com/wp-content/uploads/2014/02/Cute-marshmallow-Wallpapers-HD.jpg" title="" class=""></p><p style=""><br></p><p style=""><br></p><p style=""><br></p><p style=""><br></p>' },
            { name: 'Example Two', content:'<h1>Ut enim consuetudo loquitur, id solum dicitur honestum, quod est populari fama gloriosum.</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Itaque contra est, ac dicitis; <b>Quid censes in Latino fore?</b> </p><p>Hic ambiguo ludimur. <a href="http://loripsum.net/" target="_blank">Disserendi artem nullam habuit.</a> <i>At multis se probavit.</i> Reguli reiciendam; </p><p>Quid autem habent admirationis, cum prope accesseris? Peccata paria. <i>Quid de Pythagora?</i> Illi enim inter se dissentiunt. <a href="http://loripsum.net/" target="_blank">Videamus animi partes, quarum est conspectus illustrior;</a> Utilitatis causa amicitia est quaesita. Duo Reges: constructio interrete. </p>'}
        ];

		// Create new Gallery
		$scope.create = function() {
			// Create new Gallery object
			var gallery = new Galleries ({
				name: this.name
			});

			// Redirect after save
			gallery.$save(function(response) {
				$location.path('galleries/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Gallery
		$scope.remove = function( gallery ) {
			if ( gallery ) { gallery.$remove();

				for (var i in $scope.galleries ) {
					if ($scope.galleries [i] === gallery ) {
						$scope.galleries.splice(i, 1);
					}
				}
			} else {
				$scope.gallery.$remove(function() {
					$location.path('galleries');
				});
			}
		};

		// Update existing Gallery
		$scope.update = function() {
			var gallery = $scope.gallery ;

			gallery.$update(function() {
				$location.path('galleries/' + gallery._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Galleries
		$scope.find = function() {
			$scope.galleries = Galleries.query();
		};

		// Find existing Gallery
		$scope.findOne = function() {
			$scope.gallery = Galleries.get({ 
				galleryId: $stateParams.galleryId
			});
		};
	}
]);