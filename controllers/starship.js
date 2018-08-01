angularApp.controller('StarshipCtrl', [
    '$routeParams',
    '$scope',
    'SwapiService',
    function($routeParams, $scope, SwapiService) {

        $scope.starship = {};
		$scope.films = [];
        $scope.pilots = [];
        $scope.loadingFilms = true;
		$scope.loadingPilots = true;
		$scope.loadingStarship = true;
        $scope.id = $routeParams.id;
		$scope.error = false;
		$scope.errorMessage = '';
		$scope.getIdFromUrl = SwapiService.getIdFromUrl;

        $scope.loading = function() {
            if (!$scope.loadingStarship ||
                !$scope.loadingFilms ||
				!$scope.loadingPilots
            ) {
                return false;
            } else {
                return true;
            }
        };

        SwapiService.item('starships', $scope.id)
            .then(function(returnedStarship) {
				if (returnedStarship) {
					angular.copy(returnedStarship.data, $scope.starship);
					$scope.loadingStarship = false;
					if ($scope.starship.films.length === 0) {
						$scope.loadingFilms = false;
					}
					angular.forEach($scope.starship.films, function(filmUrl) {
						SwapiService.returnFromUrl(filmUrl)
							.then(function(returnedFilm) {
								if (returnedFilm) {
									$scope.films.push(returnedFilm.data);
									if ($scope.films.length == $scope.starship.films.length) {
										$scope.loadingFilms = false;
									}
								} else {
									$scope.error = true;
									$scope.errorMessage = "Failed to retrieve data.  Check network connection.";
								}
							});
					});


					if ($scope.starship.pilots.length === 0) {
						$scope.loadingPilots = false;
					}
					angular.forEach($scope.starship.pilots, function(pilotUrl) {
						SwapiService.returnFromUrl(pilotUrl)
							.then(function(returnedPilot) {
								if (returnedPilot) {
									$scope.pilots.push(returnedPilot.data);
									if ($scope.pilots.length == $scope.starship.pilots.length) {
										$scope.loadingPilots = false;
									}
								} else {
									$scope.error = true;
									$scope.errorMessage = "Failed to retrieve data.  Check network connection.";
								}
							});
					});
				} else {
					$scope.error = true;
					$scope.errorMessage = "Failed to retrieve data.  Check network connection.";
				}
            });
    }
]);
