angularApp.controller('PlanetCtrl', [
    '$routeParams',
    '$scope',
    'SwapiService',
    function($routeParams, $scope, SwapiService) {

        $scope.planet = {};
		$scope.films = [];
        $scope.residents = [];
        $scope.loadingFilms = true;
		$scope.loadingResidents = true;
        $scope.id = $routeParams.id;
		$scope.error = false;
		$scope.errorMessage = '';
		$scope.getIdFromUrl = SwapiService.getIdFromUrl;

        $scope.loading = function() {
            if (!$scope.loadingPlanet ||
                !$scope.loadingFilms ||
				!$scope.loadingResidents
            ) {
                return false;
            } else {
                return true;
            }
        };

        SwapiService.item('planets', $scope.id)
            .then(function(returnedPlanet) {
				if (returnedPlanet) {
					angular.copy(returnedPlanet.data, $scope.planet);
	                $scope.loadingplanet = false;
	                if ($scope.planet.films.length === 0) {
	                    $scope.loadingFilms = false;
	                }
	                angular.forEach($scope.planet.films, function(filmUrl) {
	                    SwapiService.returnFromUrl(filmUrl)
	                        .then(function(returnedFilm) {
								if (returnedFilm) {
									$scope.films.push(returnedFilm.data);
									if ($scope.films.length == $scope.planet.films.length) {
										$scope.loadingFilms = false;
									}
								} else {
									$scope.error = true;
									$scope.errorMessage = "Failed to retrieve data.  Check network connection.";
								}
	                        });
	                });


	                if ($scope.planet.residents.length === 0) {
	                    $scope.loadingResidents = false;
	                }
	                angular.forEach($scope.planet.residents, function(residentUrl) {
	                    SwapiService.returnFromUrl(residentUrl)
	                        .then(function(returnedResident) {
								if (returnedResident) {
									$scope.residents.push(returnedResident.data);
									if ($scope.residents.length == $scope.planet.residents.length) {
										$scope.loadingResidents = false;
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
