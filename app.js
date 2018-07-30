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
