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
                angular.copy(returnedPerson.data, $scope.person);
                $scope.loadingPerson = false;
                if ($scope.person.starships.length === 0) {
                    $scope.loadingStarships = false;
                }
                angular.forEach($scope.person.starships, function(starshipUrl) {
                    SwapiService.returnFromUrl(starshipUrl)
                        .then(function(returnedStarship) {
                            $scope.starships.push(returnedStarship.data.name);
                            if ($scope.starships.length == $scope.person.starships.length) {
                                $scope.loadingStarships = false;
                            }
                        });
                });


                if ($scope.person.vehicles.length === 0) {
                    $scope.loadingVehicles = false;
                }
                angular.forEach($scope.person.vehicles, function(vehicleUrl) {
                    SwapiService.returnFromUrl(vehicleUrl)
                        .then(function(returnedVehicle) {
                            $scope.vehicles.push(returnedVehicle.data.name);
                            if ($scope.vehicles.length == $scope.person.vehicles.length) {
                                $scope.loadingVehicles = false;
                            }
                        });
                });

                SwapiService.returnFromUrl($scope.person.homeworld)
                    .then(function(returnedHomeworld) {
                        $scope.person.homeworld = returnedHomeworld.data.name;
                        $scope.loadingHomeworld = false;
                    });

				if ($scope.person.species.length === 0) {
                    $scope.loadingSpecies = false;
                }
                angular.forEach($scope.person.species, function(speciesUrl) {
                    SwapiService.returnFromUrl(speciesUrl)
                        .then(function(returnedSpecies) {
                            $scope.species.push(returnedSpecies.data.name);
                            if ($scope.species.length == $scope.person.species.length) {
                                $scope.loadingSpecies = false;
                            }
                        });
                });

                angular.forEach($scope.person.films, function(filmURL) {
                    SwapiService.returnFromUrl(filmURL)
                        .then(function(returnedFilm) {
                            $scope.films.push(returnedFilm.data.title);
                            if ($scope.films.length == $scope.person.films.length) {
                                $scope.loadingFilms = false;
                            }
                        });
                });
            });
    }
]);
