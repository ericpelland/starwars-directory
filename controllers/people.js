angularApp.controller('PeopleCtrl', [
    '$scope',
    'SwapiService',
    '$location',
    '$routeParams',
    function($scope, SwapiService, $location, $routeParams) {
        $scope.loading = true;
        $scope.people = [];
        $scope.count = 0;
        $scope.next = '';
        $scope.previous = '';
        $scope.searchValue = '';
        $scope.page = $routeParams.page ? Number($routeParams.page) : 1;

        SwapiService.getDataPage('people', $scope.page).then(function(data) {
            $scope.count = data.data.count;
            $scope.next = data.data.next;
            $scope.previous = data.data.previous;
            $scope.people = data.data.results;
            $scope.loading = false;
        });

        $scope.search = function(value) {
            $scope.loading = true;
            SwapiService.search('people', value).then(function(data) {
                $scope.page = 1;
                $scope.next = data.data.next;
                $scope.previous = data.data.previous;
                $scope.people = data.data.results;
                $scope.loading = false;
            });
        };

        $scope.examinePerson = function(person) {
            var url = '/person/';
            var index = person.url.split('/')[person.url.split('/').length - 2];
            url += index;
            $location.url(url);
        };

        $scope.nextPage = function() {
            $scope.loading = true;
            $scope.page += 1;
            window.location = "#!/people/" + $scope.page;
        };

        $scope.previousPage = function() {
            $scope.loading = true;
            $scope.page -= 1;
            window.location = "#!/people/" + $scope.page;
        };
    }
]);
