angularApp.controller('CategoryCtrl', [
    '$scope',
    'SwapiService',
    '$location',
    '$routeParams',
    function($scope, SwapiService, $location, $routeParams) {
        $scope.loading = true;
        $scope.items = [];
        $scope.count = 0;
        $scope.next = '';
        $scope.previous = '';
        $scope.searchValue = '';
        $scope.error = false;
        $scope.errorMessage = '';
        $scope.selectedItem = null;

        $scope.$watch('parent.selectedCategory', function(new_val) {
            if (new_val) {
                $scope.error = false;
                $scope.errorMessage = '';
                $scope.initialize();
            }
        });

        $scope.getItemAttributeValue = function(item, index) {
            return (item[Object.keys(item)[index]]);
        };

        $scope.getItemAttributeKey = function(item, index) {
            if (item) {
                return (Object.keys(item)[index]);
            }
            return '';
        };

        $scope.initialize = function() {
            $scope.loading = true;
            $scope.selectedItem = null;
            SwapiService.getDataPage($scope.parent.selectedCategory, $scope.parent.page).then(function(data) {
                if (data) {
                    $scope.count = data.data.count;
                    $scope.next = data.data.next;
                    $scope.previous = data.data.previous;
                    $scope.items = data.data.results;
                    $scope.loading = false;
                    $('html, body').animate({
                        scrollTop: $("#category").offset().top
                    }, 1000);
                } else {
                    $scope.error = true;
                    $scope.errorMessage = "Failed to retrieve data.  Check network connection.";
                }
            });
        };
        $scope.initialize();

        $scope.search = function(value) {
            $scope.searchValue = value;
            $scope.loading = true;
            SwapiService.search($scope.parent.selectedCategory, value).then(function(data) {
                if (data) {
                    $scope.parent.page = 1;
                    $scope.count = data.data.count;
                    $scope.next = data.data.next;
                    $scope.previous = data.data.previous;
                    $scope.items = data.data.results;
                    $scope.loading = false;
                    $('html, body').animate({
                        scrollTop: $("#category").offset().top
                    }, 1000);
                } else {
                    $scope.error = true;
                    $scope.errorMessage = "Failed to retrieve data.  Check network connection.";
                }
            });
        };

        $scope.examineItem = function(item) {
            $scope.selectedItem = item;
        };

        $scope.nextPage = function() {
            $scope.loading = true;
            $scope.parent.page += 1;
            $scope.initialize();
        };

        $scope.previousPage = function() {
            $scope.loading = true;
            $scope.parent.page -= 1;
            $scope.initialize();
        };
    }
]);
