var app = angular.module('App', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/views/main.html',
            controller: 'mainController'
        });
});