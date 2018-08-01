angularApp.controller('VehicleCtrl', [
    '$routeParams',
    '$scope',
    'SwapiService',
    function($routeParams, $scope, SwapiService) {

        $scope.vehicle = {};
		$scope.films = [];
        $scope.pilots = [];
        $scope.loadingFilms = true;
		$scope.loadingPilots = true;
		$scope.loadingVehicle = true;
        $scope.id = $routeParams.id;
		$scope.error = false;
		$scope.errorMessage = '';
		$scope.getIdFromUrl = SwapiService.getIdFromUrl;

        $scope.loading = function() {
            if (!$scope.loadingVehicle ||
                !$scope.loadingFilms ||
				!$scope.loadingPilots
            ) {
                return false;
            } else {
                return true;
            }
        };

        SwapiService.item('vehicles', $scope.id)
            .then(function(returnedVehicle) {
				if (returnedVehicle) {
					angular.copy(returnedVehicle.data, $scope.vehicle);
					$scope.loadingVehicle = false;
					if ($scope.vehicle.films.length === 0) {
						$scope.loadingFilms = false;
					}
					angular.forEach($scope.vehicle.films, function(filmUrl) {
						SwapiService.returnFromUrl(filmUrl)
							.then(function(returnedFilm) {
								if (returnedFilm) {
									$scope.films.push(returnedFilm.data);
									if ($scope.films.length == $scope.vehicle.films.length) {
										$scope.loadingFilms = false;
									}
								} else {
									$scope.error = true;
									$scope.errorMessage = "Failed to retrieve data.  Check network connection.";
								}
							});
					});


					if ($scope.vehicle.pilots.length === 0) {
						$scope.loadingPilots = false;
					}
					angular.forEach($scope.vehicle.pilots, function(pilotUrl) {
						SwapiService.returnFromUrl(pilotUrl)
							.then(function(returnedPilot) {
								if (returnedPilot) {
									$scope.pilots.push(returnedPilot.data);
									if ($scope.pilots.length == $scope.vehicle.pilots.length) {
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
