var services = angular.module('swapi', []);

services.factory('SwapiService', ['$http',
    function($http) {
        function Swapi() {};
		Swapi.rootUrl = 'https://swapi.co/api/';
		Swapi.categories;
		Swapi.loading = true;

		Swapi.getIdFromUrl = function(url) {
			if(!url){
				return('');
			}
            var index = url.split('/')[url.split('/').length - 2];
            return(index);
        };

		Swapi.getCategoryFromUrl = function(url) {
			if(!url){
				return('');
			}
            var index = url.split('/')[url.split('/').length - 3];
            return(index);
        };

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

		Swapi.getCategories().then(function() {
			Swapi.loading = false;
		});

		Swapi.getDataPage = function(category, overridePage = null) {
			var url = Swapi.categories[category];
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

		Swapi.item = function(category,id) {
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
