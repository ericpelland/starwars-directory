angularApp.controller('PersonCtrl', [
    '$routeParams',
    '$scope',
    'SwapiService',
    function($routeParams, $scope, SwapiService) {

        $scope.person = {};
        $scope.films = [];
        $scope.starships = [];
        $scope.vehicles = [];
        $scope.species = [];
        $scope.loadingPerson = true;
        $scope.loadingFilms = true;
        $scope.loadingStarships = true;
        $scope.loadingVehicles = true;
        $scope.loadingHomeworld = true;
        $scope.loadingSpecies = true;
        $scope.id = $routeParams.id;
		$scope.error = false;
		$scope.errorMessage = '';
		$scope.getIdFromUrl = SwapiService.getIdFromUrl;

        $scope.loading = function() {
            if (!$scope.loadingPerson ||
                !$scope.loadingFilms ||
                !$scope.loadingStarships ||
                !$scope.loadingVehicles ||
                !$scope.loadingHomeworld ||
                !$scope.loadingSpecies
            ) {
                return false;
            } else {
                return true;
            }
        };

        SwapiService.item('people', $scope.id)
            .then(function(returnedPerson) {
				if (returnedPerson) {
					angular.copy(returnedPerson.data, $scope.person);
					$scope.loadingPerson = false;
					if ($scope.person.starships.length === 0) {
						$scope.loadingStarships = false;
					}
					angular.forEach($scope.person.starships, function(starshipUrl) {
						SwapiService.returnFromUrl(starshipUrl)
							.then(function(returnedStarship) {
								if (returnedStarship) {
									$scope.starships.push(returnedStarship.data);
									if ($scope.starships.length == $scope.person.starships.length) {
										$scope.loadingStarships = false;
									}
								} else {
									$scope.error = true;
									$scope.errorMessage = "Failed to retrieve data.  Check network connection.";
								}
							});
					});


					if ($scope.person.vehicles.length === 0) {
						$scope.loadingVehicles = false;
					}
					angular.forEach($scope.person.vehicles, function(vehicleUrl) {
						SwapiService.returnFromUrl(vehicleUrl)
							.then(function(returnedVehicle) {
								if (returnedVehicle) {
									$scope.vehicles.push(returnedVehicle.data);
									if ($scope.vehicles.length == $scope.person.vehicles.length) {
										$scope.loadingVehicles = false;
									}
								} else {
									$scope.error = true;
									$scope.errorMessage = "Failed to retrieve data.  Check network connection.";
								}
							});
					});

					SwapiService.returnFromUrl($scope.person.homeworld)
						.then(function(returnedHomeworld) {
							if (returnedHomeworld) {
								$scope.person.homeworld = returnedHomeworld.data.name;
								$scope.loadingHomeworld = false;
							} else {
								$scope.error = true;
								$scope.errorMessage = "Failed to retrieve data.  Check network connection.";
							}
						});

					if ($scope.person.species.length === 0) {
						$scope.loadingSpecies = false;
					}
					angular.forEach($scope.person.species, function(speciesUrl) {
						SwapiService.returnFromUrl(speciesUrl)
							.then(function(returnedSpecies) {
								if (returnedSpecies) {
									$scope.species.push(returnedSpecies.data);
									if ($scope.species.length == $scope.person.species.length) {
										$scope.loadingSpecies = false;
									}
								} else {
									$scope.error = true;
									$scope.errorMessage = "Failed to retrieve data.  Check network connection.";
								}
							});
					});

					angular.forEach($scope.person.films, function(filmUrl) {
						SwapiService.returnFromUrl(filmUrl)
							.then(function(returnedFilm) {
								$scope.films.push(returnedFilm.data);
								if ($scope.films.length == $scope.person.films.length) {
									$scope.loadingFilms = false;
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
