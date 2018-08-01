//Determine browser language
var lang = window.navigator.language || window.navigator.userLanguage;

//TODO: Remove after adding support for other languages.
// Default any browser language detected to en-US
if (lang !== 'en-US') {
    lang = "en-US";
}

//Translations, can be exported to i18n files, leaving here for now.
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
        "gender": "Gender",
        "eye color": "Eye Color",
        "eye colors": "Eye Colors",
        "population": "Population",
        "none": "None",
        "episode id": "Episode #",
        "opening crawl": "Opening Crawl",
        "producer": "Producer",
        "characters": "Characters",
        "no results": "No Results",
        "starships piloted": "Starships Piloted",
        "vehicles piloted": "Vehicles Piloted",
        "birth year": "Birth Year",
        "hair color": "Hair Color",
        "hair colors": "Hair Colors",
        "mass": "Mass (kg)",
        "height": "Height (cm)",
        "homeworld": "Homeworld",
        "skin color": "Skin Color",
        "skin colors": "Skin Colors",
        "diameter": "Diameter (km)",
        "rotation period": "Rotation Period (hours)",
        "orbital period": "Orbital Period (days)",
        "gravity": "Gravity (G)",
        "climate": "Climate",
        "terrain": "Terrain",
        "surface water": "Surface Water (%)",
        "residents": "Residents",
        "classification": "Classification",
        "designation": "Designation",
        "language": "Language",
        "average lifespan": "Average Lifespan (years)",
        "average height": "Average Height (cm)",
        "model": "Model",
        "starship class": "Starship Class",
        "vehicle class": "Vehicle Class",
        "pilots": "Pilots",
        "consumables": "Max Time Between Resupply",
        "cargo capacity": "Cargo Capacity (kg)",
        "mglt": "Speed per Hour (Megalights)",
        "hyperdrive rating": "Hyperdrive Rating",
        "max atmosphering speed": "Max Atmosphering Speed",
        "passengers": "Passengers",
        "crew": "Crew Members",
        "length": "Length (m)",
        "cost in credits": "Cost (credits)",
        "manufacturer": "Manufacturer",
        "created": "Created",
        "edited": "Edited"
    }
};

var angularApp = angular.module('AngularApp', ['ngRoute', 'swapi']);
// configure routing to use single page, single parent controller
angularApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        }).otherwise('/');

});

//Custom directive for enter click, because this should be standard.
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
        input = input || '';
        input = input.toLowerCase().split('_').join(' ');
        if (translations[lang]) {
            if (translations[lang][input]) {
                return (translations[lang][input]);
            }
        }
        return input;
    };
});
