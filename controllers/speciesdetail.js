angularApp.controller('SpeciesDetailCtrl', [
    '$routeParams',
    '$scope',
    'SwapiService',
    function($routeParams, $scope, SwapiService) {

        $scope.species = {};
		$scope.films = [];
        $scope.people = [];
        $scope.loadingFilms = true;
		$scope.loadingPeople = true;
		$scope.loadingSpecies = true;
        $scope.id = $routeParams.id;
		$scope.error = false;
		$scope.errorMessage = '';
		$scope.getIdFromUrl = SwapiService.getIdFromUrl;

        SwapiService.item('species', $scope.id)
            .then(function(returnedSpecies) {
				if (returnedSpecies) {
					angular.copy(returnedSpecies.data, $scope.species);
					$scope.loadingSpecies = false;
					if ($scope.species.films.length === 0) {
						$scope.loadingFilms = false;
					}
					angular.forEach($scope.species.films, function(filmUrl) {
						SwapiService.returnFromUrl(filmUrl)
							.then(function(returnedFilm) {
								if (returnedFilm) {
									$scope.films.push(returnedFilm.data);
									if ($scope.films.length == $scope.species.films.length) {
										$scope.loadingFilms = false;
									}
								} else {
									$scope.error = true;
									$scope.errorMessage = "Failed to retrieve data.  Check network connection.";
								}
							});
					});


					if ($scope.species.people.length === 0) {
						$scope.loadingPeople = false;
					}
					angular.forEach($scope.species.people, function(personUrl) {
						SwapiService.returnFromUrl(personUrl)
							.then(function(returnedPerson) {
								if (returnedPerson) {
									$scope.people.push(returnedPerson.data);
									if ($scope.people.length == $scope.species.people.length) {
										$scope.loadingPeople = false;
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
