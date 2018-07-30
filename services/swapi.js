var services = angular.module('swapi', []);

services.factory('SwapiService', ['$http',
    function($http) {
        function Swapi() {};
		Swapi.categories = [
			// "Films",
		    "People",
		    // "Planets",
		    // "Species",
		    // "Starships",
		    // "Vehicles"
		];

        Swapi.urls = {
			"root": 'https://swapi.co/api',
			// "films": "https://swapi.co/api/films/",
		    "people": "https://swapi.co/api/people/",
		    // "planets": "https://swapi.co/api/planets/",
		    // "species": "https://swapi.co/api/species/",
		    // "starships": "https://swapi.co/api/starships/",
		    // "vehicles": "https://swapi.co/api/vehicles/"
		};

		Swapi.getDataPage = function(category, overridePage = null) {
			var url = Swapi.urls[category];
			if(overridePage) {
				url += '?page=' + overridePage;
			}
			return $http.get(url)
				.then(function(response) {
					return response;
				});
        };

		Swapi.search = function(category, val) {
			var url = Swapi.urls[category] + '?search=' + val;
			return $http.get(url)
				.then(function(response) {
					return response;
				});
        };

		Swapi.item = function(category,id) {
            var url = Swapi.urls[category] + id + '/';
            return $http.get(url)
                .then(function(response) {
                    return response;
                });
        };

		Swapi.returnFromUrl = function(url) {
			return $http.get(url)
				.then(function(response) {
					return response;
				});
		};

        return Swapi;
    }
]);
