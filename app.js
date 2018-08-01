//Determine browser language
var lang = window.navigator.language || window.navigator.userLanguage;

//TODO: Remove after adding support for other languages.
if (lang !== 'en-US') {
	lang = "en-US";
}

//Translations, can be exported to i18n folder once complex
var translations = {
	"en-US": {
		"categories": "Categories",
		"films": "Films",
		"people": "People",
		"planets": "Planets",
		"species": "Species",
		"starships": "Starships",
		"vehicles": "Vehicles",
		"home": "Home",
		"search": "Search",
		"title": "Title",
		"director": "Director",
		"release date": "Release Date",
		"located": "Located",
		"page": "Page",
		"next": "Next",
		"back": "Back",
		"name": "Name",
		"# movies": "# Movies",
		"gender": "Gender",
		"eye color": "Eye Color",
		"population": "Population",
		"none": "None",
		"episode #": "Episode #",
		"opening crawl": "Opening Crawl",
		"producer": "Producer",
		"characters": "Characters",
		"no results": "No Results",
		"starships piloted": "Starships Piloted",
		"vehicles piloted": "Vehicles Piloted",
		"birth year": "Birth Year",
		"after the battle of": "After the Battle of",
		"before the battle of": "Before the Battle of",
		"hair color": "Hair Color",
		"mass": "Mass",
		"height": "Height",
		"homeworld": "Homeworld",
		"skin color": "Skin Color",
		"diameter": "Diameter",
		"rotation period": "Rotation Period",
		"orbital period": "Orbital Period",
		"gravity": "Gravity",
		"climate": "Climate",
		"terrain": "Terrain",
		"surface water": "Surface Water",
		"residents": "Residents",
		"classification": "Classification",
		"designation" : "Designation",
		"language" : "Language",
		"average lifespan": "Average Lifespan",
		"average height": "Average Height",
		"model": "Model",
		"starship class": "Starship Class",
		"vehicle class": "Vehicle Class",
		"pilots": "Pilots",
		"max time between resupply": "Max Time Between Resupply",
		"cargo capacity": "Cargo Capacity",
		"max megalights per hour": "Max Megalights per Hour",
		"hyperdrive rating": "Hyperdrive Rating",
		"max atmosphering speed": "Max Atmosphering Speed",
		"passengers": "Passengers",
		"crew members": "Crew Members",
		"length": "Length",
		"cost in credits": "Cost in Credits",
		"manufacturer": "Manufacturer",
		"created": "Created",
		"edited": "Edited"
	}
};

var angularApp = angular.module('AngularApp', ['ngRoute', 'swapi']);
angularApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        }).when('/people', {
            templateUrl: 'views/people.html',
            controller: 'PeopleCtrl',
            controllerAs: 'main'
        }).when('/people/:page', {
            templateUrl: 'views/people.html',
            controller: 'PeopleCtrl',
            controllerAs: 'people'
        }).when('/person/:id', {
            templateUrl: 'views/person.html',
            controller: 'PersonCtrl',
            controllerAs: 'person'
        }).when('/films', {
            templateUrl: 'views/films.html',
            controller: 'FilmsCtrl',
            controllerAs: 'films'
        }).when('/films/:page', {
            templateUrl: 'views/films.html',
            controller: 'FilmsCtrl',
            controllerAs: 'films'
        }).when('/film/:id', {
            templateUrl: 'views/film.html',
            controller: 'FilmCtrl',
            controllerAs: 'film'
        }).when('/planets/:page', {
            templateUrl: 'views/planets.html',
            controller: 'PlanetsCtrl',
            controllerAs: 'planets'
        }).when('/planets', {
            templateUrl: 'views/planets.html',
            controller: 'PlanetsCtrl',
            controllerAs: 'planets'
        }).when('/planet/:id', {
            templateUrl: 'views/planet.html',
            controller: 'PlanetCtrl',
            controllerAs: 'planet'
        }).when('/species', {
            templateUrl: 'views/species.html',
            controller: 'SpeciesCtrl',
            controllerAs: 'species'
        }).when('/species/:page', {
            templateUrl: 'views/species.html',
            controller: 'SpeciesCtrl',
            controllerAs: 'species'
        }).when('/speciesdetail/:id', {
            templateUrl: 'views/speciesdetail.html',
            controller: 'SpeciesDetailCtrl',
            controllerAs: 'speciesdetail'
        }).when('/starships', {
            templateUrl: 'views/starships.html',
            controller: 'StarshipsCtrl',
            controllerAs: 'starships'
        }).when('/starships/:page', {
            templateUrl: 'views/starships.html',
            controller: 'StarshipsCtrl',
            controllerAs: 'starshipsdetail'
        }).when('/starship/:id', {
            templateUrl: 'views/starship.html',
            controller: 'StarshipCtrl',
            controllerAs: 'starshipdetail'
        }).when('/vehicles', {
            templateUrl: 'views/vehicles.html',
            controller: 'VehiclesCtrl',
            controllerAs: 'vehicles'
        }).when('/vehicles/:page', {
            templateUrl: 'views/vehicles.html',
            controller: 'VehiclesCtrl',
            controllerAs: 'vehiclesdetail'
        }).when('/vehicle/:id', {
            templateUrl: 'views/vehicle.html',
            controller: 'VehicleCtrl',
            controllerAs: 'vehicledetail'
        }).otherwise('/');

});

//Custom directive for enter click.
angularApp.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});


//Custom filter(pipe) for simple translations
angularApp.filter('translate', function() {
  return function(input) {
    input = input.toLowerCase() || '';
	if(translations[lang]) {
		if(translations[lang][input]) {
			return (translations[lang][input]);
		}
	}
    return input;
  };
});
