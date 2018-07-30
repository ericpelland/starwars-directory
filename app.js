var angularApp = angular.module('AngularApp', ['ngRoute']);
angularApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        }).otherwise('/');

});
