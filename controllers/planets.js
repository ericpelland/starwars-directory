angularApp.controller('PlanetsCtrl', [
    '$scope',
    'SwapiService',
    '$location',
    '$routeParams',
    function($scope, SwapiService, $location, $routeParams) {
        $scope.loading = true;
        $scope.planets = [];
        $scope.count = 0;
        $scope.next = '';
        $scope.previous = '';
        $scope.searchValue = '';
        $scope.page = $routeParams.page ? Number($routeParams.page) : 1;
		$scope.error = false;
		$scope.errorMessage = '';

        SwapiService.getDataPage('planets', $scope.page).then(function(data) {
			if (data) {
				$scope.count = data.data.count;
	            $scope.next = data.data.next;
	            $scope.previous = data.data.previous;
	            $scope.planets = data.data.results;
	            $scope.loading = false;
			} else {
				$scope.error = true;
				$scope.errorMessage = "Failed to retrieve data.  Check network connection.";
			}
        });

        $scope.search = function(value) {
			$scope.searchValue = value;
            $scope.loading = true;
            SwapiService.search('planets', value).then(function(data) {
				if (data) {
					$scope.page = 1;
	                $scope.next = data.data.next;
	                $scope.previous = data.data.previous;
	                $scope.planets = data.data.results;
	                $scope.loading = false;
				} else {
					$scope.error = true;
					$scope.errorMessage = "Failed to retrieve data.  Check network connection.";
				}
            });
        };

        $scope.examinePlanet = function(planet) {
            var url = '/planet/';
            var index = planet.url.split('/')[planet.url.split('/').length - 2];
            url += index;
            $location.url(url);
        };

        $scope.nextPage = function() {
            $scope.loading = true;
            $scope.page += 1;
            window.location = "#!/planets/" + $scope.page;
        };

        $scope.previousPage = function() {
            $scope.loading = true;
            $scope.page -= 1;
            window.location = "#!/planets/" + $scope.page;
        };
    }
]);
