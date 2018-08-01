angularApp.controller('MainCtrl', [
    '$scope',
    'SwapiService',
    '$location',
    function($scope, SwapiService, $location) {
        $scope.loading = true;
        $scope.categories = null;
        $scope.parent = {
            selectedCategory: null,
            page: 1
        };

        // get the categories and urls from the api root
        SwapiService.getCategories().then(function(categories) {
            $scope.categories = categories;
            $scope.loading = false;
        });

        // select a category to search and view the items
        $scope.selectCategory = function(category) {
            $scope.parent.page = 1;
            $scope.parent.selectedCategory = category;
        };

        $scope.getItemAttributeValue = function(item, index) {
            return (item[Object.keys(item)[index]]);
        };

        $scope.getItemAttributeKey = function(item, index) {
            if (item) {
                return (Object.keys(item)[index]);
            }
            return '';
        };

        $scope.scrollTo = function(identifier) {
            $('html, body').animate({
                scrollTop: $(identifier).offset().top
            }, 1000);
        };
    }
]);
