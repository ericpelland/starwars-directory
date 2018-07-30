angularApp.controller('FilmsCtrl', [
    '$scope',
    'SwapiService',
    '$location',
    '$routeParams',
    function($scope, SwapiService, $location, $routeParams) {
        $scope.loading = true;
        $scope.films = [];
        $scope.count = 0;
        $scope.next = '';
        $scope.previous = '';
        $scope.searchValue = '';
        $scope.page = $routeParams.page ? Number($routeParams.page) : 1;

        SwapiService.getDataPage('films', $scope.page).then(function(data) {
            $scope.count = data.data.count;
            $scope.next = data.data.next;
            $scope.previous = data.data.previous;
            $scope.films = data.data.results;
            $scope.loading = false;
        });

        $scope.search = function(value) {
            $scope.loading = true;
            SwapiService.search('films', value).then(function(data) {
                $scope.page = 1;
                $scope.next = data.data.next;
                $scope.previous = data.data.previous;
                $scope.films = data.data.results;
                $scope.loading = false;
            });
        };

        $scope.examineFilm = function(film) {
            var url = '/film/';
            var index = film.url.split('/')[film.url.split('/').length - 2];
            url += index;
            $location.url(url);
        };

        $scope.nextPage = function() {
            $scope.loading = true;
            $scope.page += 1;
            window.location = "#!/films/" + $scope.page;
        };

        $scope.previousPage = function() {
            $scope.loading = true;
            $scope.page -= 1;
            window.location = "#!/films/" + $scope.page;
        };
    }
]);
