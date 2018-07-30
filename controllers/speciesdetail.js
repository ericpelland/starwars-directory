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

		$scope.getIdFromUrl = SwapiService.getIdFromUrl;

        $scope.loading = function() {
            if (!$scope.loadingSpecies ||
                !$scope.loadingFilms ||
				!$scope.loadingPeople
            ) {
                return false;
            } else {
                return true;
            }
        };

        SwapiService.item('species', $scope.id)
            .then(function(returnedSpecies) {
                angular.copy(returnedSpecies.data, $scope.species);
                $scope.loadingSpecies = false;
                if ($scope.species.films.length === 0) {
                    $scope.loadingFilms = false;
                }
                angular.forEach($scope.species.films, function(filmUrl) {
                    SwapiService.returnFromUrl(filmUrl)
                        .then(function(returnedFilm) {
                            $scope.films.push(returnedFilm.data);
                            if ($scope.films.length == $scope.species.films.length) {
                                $scope.loadingFilms = false;
                            }
                        });
                });


                if ($scope.species.people.length === 0) {
                    $scope.loadingPeople = false;
                }
                angular.forEach($scope.species.people, function(personUrl) {
                    SwapiService.returnFromUrl(personUrl)
                        .then(function(returnedPerson) {
                            $scope.people.push(returnedPerson.data);
                            if ($scope.people.length == $scope.species.people.length) {
                                $scope.loadingPeople = false;
                            }
                        });
                });
            });
    }
]);
