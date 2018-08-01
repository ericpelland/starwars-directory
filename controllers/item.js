angularApp.controller('ItemCtrl', [
    '$scope',
    'SwapiService',
    function($scope, SwapiService) {
        $scope.loading = true;
        $scope.error = false;
        $scope.item = {};
        $scope.errorMessage = '';
        $scope.links = [];

		// check if variable is an array
        $scope.isArray = function(arr) {
            return (Array.isArray(arr));
        };

		// watch selectedItem for a change
        $scope.$watch('parent.selectedItem', function(new_val) {
            if (new_val) {
                $scope.initialize();
                $scope.error = false;
                $scope.errorMessage = '';
            }
        });

		// check if string is a url
        $scope.isValidUrl = function(str) {
            var a = document.createElement('a');
            a.href = str;
            return (a.host && a.host != window.location.host);
        };

		// Switch the item detail to another item. Also changes the category if needed.
        $scope.switchItem = function(url) {
            var id = SwapiService.getIdFromUrl(url);
            var category = SwapiService.getCategoryFromUrl(url);
			$scope.parent.page = 1;
			$scope.parent.selectedCategory = category;
            SwapiService.returnFromUrl(url).then(function(data) {
                $scope.parent.selectedItem = data.data;
                $scope.item = data.data;
            });
        };

		// replace api urls with the name/title of the data retrieved from the url
        $scope.fillData = function(obj) {
            Object.keys(obj).forEach(function(key) {
                var attribute = obj[key];
                if (Array.isArray(attribute)) {
                    obj[key] = $scope.fillData(attribute);
                } else if ($scope.isValidUrl(attribute)) {
					// Displays loading until the data has been retrieved
                    obj[key] = "Loading...";
                    SwapiService.returnFromUrl(attribute).then(function(data) {
                        $scope.links[data.data[Object.keys(data.data)[0]].toString()] = attribute;
                        obj[key] = data.data[Object.keys(data.data)[0]];
                    });
                }
            });
            return obj;
        };

		// initialize
        $scope.initialize = function() {
            $scope.loading = true;
            SwapiService.item($scope.parent.selectedCategory, SwapiService.getIdFromUrl($scope.parent.selectedItem.url))
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
