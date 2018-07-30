var services = angular.module('swapi', []);

services.factory('SwapiService', ['$http',
    function($http) {
        function Swapi() {};
		Swapi.categories = [
			"Films",
		    "People",
		    "Planets",
		    "Species",
		    "Starships",
		    "Vehicles"
		];

        Swapi.urls = {
			"root": 'https://swapi.co/api',
			"films": "https://swapi.co/api/films/",
		    "people": "https://swapi.co/api/people/",
		    "planets": "https://swapi.co/api/planets/",
		    "species": "https://swapi.co/api/species/",
		    "starships": "https://swapi.co/api/starships/",
		    "vehicles": "https://swapi.co/api/vehicles/"
		};

		Swapi.getIdFromUrl = function(url) {
			if(!url){
				return('');
			}
            var index = url.split('/')[url.split('/').length - 2];
            return(index);
        };

		Swapi.getDataPage = function(category, overridePage = null) {
			var url = Swapi.urls[category];
			if(overridePage) {
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

		Swapi.search = function(category, val) {
			var url = Swapi.urls[category] + '?search=' + val;
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

		Swapi.item = function(category,id) {
            var url = Swapi.urls[category] + id + '/';
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
