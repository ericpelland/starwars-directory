angularApp.controller('SpeciesCtrl', [
    '$scope',
    'SwapiService',
    '$location',
    '$routeParams',
    function($scope, SwapiService, $location, $routeParams) {
        $scope.loading = true;
        $scope.species = [];
        $scope.count = 0;
        $scope.next = '';
        $scope.previous = '';
        $scope.searchValue = '';
        $scope.page = $routeParams.page ? Number($routeParams.page) : 1;

        SwapiService.getDataPage('species', $scope.page).then(function(data) {
            $scope.count = data.data.count;
            $scope.next = data.data.next;
            $scope.previous = data.data.previous;
            $scope.species = data.data.results;
            $scope.loading = false;
        });

        $scope.search = function(value) {
            $scope.loading = true;
            SwapiService.search('species', value).then(function(data) {
                $scope.page = 1;
                $scope.next = data.data.next;
                $scope.previous = data.data.previous;
                $scope.species = data.data.results;
                $scope.loading = false;
            });
        };

        $scope.examineSpecies = function(species) {
            var url = '/speciesdetail/';
            var index = species.url.split('/')[species.url.split('/').length - 2];
            url += index;
            $location.url(url);
        };

        $scope.nextPage = function() {
            $scope.loading = true;
            $scope.page += 1;
            window.location = "#!/species/" + $scope.page;
        };

        $scope.previousPage = function() {
            $scope.loading = true;
            $scope.page -= 1;
            window.location = "#!/species/" + $scope.page;
        };
    }
]);
