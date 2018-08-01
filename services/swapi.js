var services = angular.module('swapi', []);

services.factory('SwapiService', ['$http',
    function($http) {
        function Swapi() {};
        Swapi.rootUrl = 'https://swapi.co/api/';
        Swapi.categories;
        Swapi.loading = true;

		// strip id from api url
        Swapi.getIdFromUrl = function(url) {
            if (!url) {
                return ('');
            }
            var index = url.split('/')[url.split('/').length - 2];
            return (index);
        };

		// strip category from api url
        Swapi.getCategoryFromUrl = function(url) {
            if (!url) {
                return ('');
            }
            var index = url.split('/')[url.split('/').length - 3];
            return (index);
        };

		// get categories from root api url
        Swapi.getCategories = function() {
            if (Swapi.categories) {
                return Swapi.categories;
            } else {
                var url = Swapi.rootUrl;
                return $http.get(url).then(
                    function(response) {
                        Swapi.categories = response.data;
                        return (Swapi.categories);
                    },
                    function(data) {
                        Swapi.handleError();
                    }
                );
            }
        };

		// on service init, retrieve categories
        Swapi.getCategories().then(function() {
            Swapi.loading = false;
        });

		// get all the items from within a category, with an option to get specific pages
        Swapi.getDataPage = function(category, overridePage = null) {
            var url = Swapi.categories[category];
            if (overridePage) {
                url += '?page=' + overridePage;
            }
            return $http.get(url).then(
                function(response) {
                    return response;
                },
                function(data) {
                    Swapi.handleError();
                    return false;
                }
            );
        };

		// search through the category by item name or title
        Swapi.search = function(category, val) {
            var url = Swapi.categories[category] + '?search=' + val;
            return $http.get(url).then(
                function(response) {
                    return response;
                },
                function(data) {
                    Swapi.handleError();
                    return false;
                }
            );
        };

		// get data on a specific item by id, within a specified category
        Swapi.item = function(category, id) {
            var url = Swapi.categories[category] + id + '/';
            return $http.get(url).then(
                function(response) {
                    return response;
                },
                function(data) {
                    Swapi.handleError();
                    return false;
                }
            );
        };

		// return data directly from a givin api url
        Swapi.returnFromUrl = function(url) {
            return $http.get(url).then(
                function(response) {
                    return response;
                },
                function(data) {
                    Swapi.handleError();
                    return false;
                }
            );
        };

        Swapi.handleError = function() {
            console.log("Swapi connection error.");
        };

        return Swapi;
    }
]);
