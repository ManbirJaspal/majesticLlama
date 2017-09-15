
var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider,$locationProvider) {
     $locationProvider.hashPrefix('');
    $routeProvider
    .when("/home", {
        templateUrl : "/views/home.html",
        controller: "homeController"
    })
    .when("/game", {
        templateUrl : "/views/game.html",
        controller: "llamaController"
    })
    .when("/aboutme", {
        templateUrl : "/views/aboutme.html",
        controller:"aboutmeController"
    })
    .otherwise({
                redirectTo: "/home"
            });
    });