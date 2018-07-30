angularApp.controller('MainCtrl', [
    '$scope',
    'SwapiService',
    '$location',
    function($scope, SwapiService, $location) {
        $scope.loading = true;
        $scope.categories = SwapiService.categories;
        $scope.loading = false;

        $scope.selectCategory = function(category) {
            $location.url(category.toLowerCase());
        };
    }
]);
