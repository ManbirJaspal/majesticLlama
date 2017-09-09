
var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider,$locationProvider) {
     $locationProvider.hashPrefix('');
    $routeProvider
    .when("/home", {
        templateUrl : "/views/home.html"
    })
    .when("/llama", {
        templateUrl : "/views/llama.html"
    })
    .when("/aboutme", {
        templateUrl : "/views/aboutme.html"
    })
    });