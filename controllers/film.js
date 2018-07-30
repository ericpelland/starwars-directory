angularApp.controller('FilmCtrl', [
    '$routeParams',
    '$scope',
    'SwapiService',
    function($routeParams, $scope, SwapiService) {

        $scope.film = {};
        $scope.species = [];
        $scope.starships = [];
        $scope.vehicles = [];
        $scope.characters = [];
		$scope.planets = [];

        $scope.loadingFilm = true;
        $scope.loadingPlanets = true;
		$scope.loadingCharacters = true;
        $scope.loadingStarships = true;
        $scope.loadingVehicles = true;
        $scope.loadingSpecies = true;
        $scope.id = $routeParams.id;

		$scope.getIdFromUrl = SwapiService.getIdFromUrl;

        $scope.loading = function() {
            if (!$scope.loadingFilm ||
                !$scope.loadingPlanets ||
				!$scope.loadingCharacters ||
                !$scope.loadingStarships ||
                !$scope.loadingVehicles ||
                !$scope.loadingSpecies
            ) {
                return false;
            } else {
                return true;
            }
        };

        SwapiService.item('films', $scope.id)
            .then(function(returnedFilm) {
                angular.copy(returnedFilm.data, $scope.film);
                $scope.loadingFilm = false;
                if ($scope.film.starships.length === 0) {
                    $scope.loadingStarships = false;
                }
                angular.forEach($scope.film.starships, function(starshipUrl) {
                    SwapiService.returnFromUrl(starshipUrl)
                        .then(function(returnedStarship) {
                            $scope.starships.push(returnedStarship.data);
                            if ($scope.starships.length == $scope.film.starships.length) {
                                $scope.loadingStarships = false;
                            }
                        });
                });


                if ($scope.film.vehicles.length === 0) {
                    $scope.loadingVehicles = false;
                }
                angular.forEach($scope.film.vehicles, function(vehicleUrl) {
                    SwapiService.returnFromUrl(vehicleUrl)
                        .then(function(returnedVehicle) {
                            $scope.vehicles.push(returnedVehicle.data);
                            if ($scope.vehicles.length == $scope.film.vehicles.length) {
                                $scope.loadingVehicles = false;
                            }
                        });
                });

				if ($scope.film.species.length === 0) {
                    $scope.loadingSpecies = false;
                }
                angular.forEach($scope.film.species, function(speciesUrl) {
                    SwapiService.returnFromUrl(speciesUrl)
                        .then(function(returnedSpecies) {
                            $scope.species.push(returnedSpecies.data);
                            if ($scope.species.length == $scope.film.species.length) {
                                $scope.loadingSpecies = false;
                            }
                        });
                });

				if ($scope.film.characters.length === 0) {
                    $scope.loadingCharacters = false;
                }
                angular.forEach($scope.film.characters, function(characterURL) {
                    SwapiService.returnFromUrl(characterURL)
                        .then(function(returnedCharacter) {
                            $scope.characters.push(returnedCharacter.data);
                            if ($scope.characters.length == $scope.film.characters.length) {
                                $scope.loadingCharacters = false;
                            }
                        });
                });

				if ($scope.film.planets.length === 0) {
                    $scope.loadingPlanets = false;
                }
                angular.forEach($scope.film.planets, function(planetURL) {
                    SwapiService.returnFromUrl(planetURL)
                        .then(function(returnedPlanet) {
                            $scope.planets.push(returnedPlanet.data);
                            if ($scope.planets.length == $scope.film.planets.length) {
                                $scope.loadingPlanets = false;
                            }
                        });
                });
            });
    }
]);
