angularApp.controller('MainCtrl', [
    '$scope',
    'SwapiService',
    '$location',
    function($scope, SwapiService, $location) {
        $scope.loading = true;
        $scope.categories = null;
		$scope.parent = {};
		$scope.parent.selectedCategory = null;
		$scope.parent.page = 1;

		SwapiService.getCategories().then(function(categories){
			$scope.categories = categories;
			$scope.loading = false;
		});

        $scope.selectCategory = function(category) {
			$scope.parent.page = 1;
            $scope.parent.selectedCategory = category;
        };
    }
]);
