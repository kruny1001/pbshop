/**
 * Created by Kevin on 2014-11-11.
 */

angular.module('gdriveapps').controller('AddNewProductController', ['$scope','$stateParams','Authentication', 'Products', 'BannerByUserId',
    function($scope, $stateParams, Authentication, Products, BannerByUserId) {
        $scope.authentication = Authentication;
        $scope.parentId=$stateParams.bannerId;
        // Create new Product
        $scope.create = function() {
            // Create new Product object
            var product = new Products({
                name: this.name,
                mainimg: this.mainimg,
                imgs: this.imgs,
                price: this.price,
                description: this.description,
                parentId: $scope.selectedBanner._id, // Product record is under banner content
                detailDesc: $scope.detailDesc
            });

            // Redirect after save
            product.$save(function(response) {
                alert('Successfully Added');
                $scope.error = '';
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });

            // Clear form fields
            this.name = '';
            this.mainimg ='';
            this.imgs='';
            this.price=0;
            this.description = '';
        };

        // Update existing Product
        $scope.update = function() {
            var product = $scope.product;

            product.$update(function() {
                //$location.path('products/' + product._id);
                alert('updated successfully')
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Products
        $scope.find = function() {
            $scope.products = Products.query();
        };

        $scope.findBanners = function() {
            $scope.banners = Banners.query();
        };

        // Find existing Product
        $scope.findOne = function() {
            Products.get({
                productId: $stateParams.productId
            }).$promise.then(function(result){
                $scope.product = result;
                $scope.selectOption();
            });
        };

        $scope.findProductUnderBanner = function() {
            console.log('banner id is '+ $scope.parentId);
            $scope.products = ProductsBanner.query({},{bannerId:$scope.parentId});
        };

        $scope.getBanners = function() {
            $scope.banners = BannerByUserId.query({userId: Authentication.user._id});
        };

        $scope.selectOption = function(){
            $scope.selectedBanner = $scope.product.parentId;//$scope.product.parentId;
        };
    }
]);