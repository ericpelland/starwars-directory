angularApp.controller('CategoryCtrl', [
    '$scope',
    'SwapiService',
    '$timeout',
    function($scope, SwapiService, $timeout) {
        $scope.loading = true;
        $scope.items = [];
        $scope.count = 0;
        $scope.next = '';
        $scope.previous = '';
        $scope.searchValue = '';
        $scope.error = false;
        $scope.errorMessage = '';
        $scope.parent.selectedItem = null;

        // Watch for changes on the selected category
        $scope.$watch('parent.selectedCategory', function(new_val) {
            if (new_val) {
                $scope.error = false;
                $scope.errorMessage = '';
                $scope.initialize();
            }
        });

        // initialize
        $scope.initialize = function() {
            $scope.loading = true;
            var hadItem = false;
            if ($scope.parent.selectedItem) {
                $scope.parent.selectedItem = null;
                hadItem = true;
            }
            // Get categories data.
            SwapiService.getDataPage($scope.parent.selectedCategory, $scope.parent.page).then(function(data) {
                if (data) {
                    $scope.count = data.data.count;
                    $scope.next = data.data.next;
                    $scope.previous = data.data.previous;
                    $scope.items = data.data.results;
                    $scope.loading = false;
                    // Scroll to section
                    $scope.scrollTo("#category");
                } else {
                    $scope.error = true;
                    $scope.errorMessage = "Failed to retrieve data.  Check network connection.";
                }
            });
        };

        // Handle searching through name and title for the category
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
                    //Scroll to element
                    $scope.scrollTo("#category");
                } else {
                    $scope.error = true;
                    $scope.errorMessage = "Failed to retrieve data.  Check network connection.";
                }
            });
        };

        // Examine data on specific item
        $scope.examineItem = function(item) {
            $scope.parent.selectedItem = item;
        };

        // paginate to the next set of data
        $scope.nextPage = function() {
            $scope.loading = true;
            $scope.parent.page += 1;
            $scope.initialize();
        };

        // paginate to the previous set of data
        $scope.previousPage = function() {
            $scope.loading = true;
            $scope.parent.page -= 1;
            $scope.initialize();
        };

        // close section
        $scope.close = function() {
            $scope.scrollTo('#top');
            $timeout(() => {
                $scope.parent.selectedCategory = null;
            }, 1000);
        };


        $scope.initialize();
    }
]);
