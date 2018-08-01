angularApp.controller('ItemCtrl', [
    '$routeParams',
    '$scope',
    'SwapiService',
    function($routeParams, $scope, SwapiService) {

        $scope.loading = true;
        $scope.error = false;
        $scope.item = {};
        $scope.errorMessage = '';
        $scope.getIdFromUrl = SwapiService.getIdFromUrl;
		$scope.links = [];

		$scope.isArray = function(arr) {
			return(Array.isArray(arr));
		}

        $scope.$watch('selectedItem', function(new_val) {
            if (new_val) {
                $scope.initialize();
            }
        });

        $scope.isValidUrl = function(str) {
            var a = document.createElement('a');
            a.href = str;
            return (a.host && a.host != window.location.host);
        };

		$scope.switchItem = function(url) {
			var id = SwapiService.getIdFromUrl(url);
			var category = SwapiService.getCategoryFromUrl(url);
			SwapiService.returnFromUrl(url).then(function(data) {
				$scope.selectedItem = data.data;
				$scope.item = data.data;
			});
		};

        $scope.fillData = function(obj) {
            Object.keys(obj).forEach(function(key) {
                var attribute = obj[key];
                if (Array.isArray(attribute)) {
                    obj[key] = $scope.fillData(attribute);
                } else if($scope.isValidUrl(attribute)){
					obj[key] = "Loading...";
					SwapiService.returnFromUrl(attribute).then(function(data) {
						$scope.links[data.data[Object.keys(data.data)[0]].toString()] = attribute;
						obj[key] = data.data[Object.keys(data.data)[0]];
					});
                }
            });
			return obj;
        };

        $scope.initialize = function() {
            $scope.loading = true;
            SwapiService.item($scope.parent.selectedCategory, SwapiService.getIdFromUrl($scope.selectedItem.url))
                .then(function(returnedItem) {
                    if (returnedItem) {
                        angular.copy(returnedItem.data, $scope.item);
                        $scope.item = $scope.fillData($scope.item);
						$scope.loading = false;
						$('html, body').animate({
						    scrollTop: $("#item").offset().top
						}, 1000);
                    } else {
                        $scope.error = true;
                        $scope.errorMessage = "Failed to retrieve data.  Check network connection.";
                    }
                });
        };

        $scope.initialize();
    }
]);
