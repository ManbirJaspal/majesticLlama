(function () {
    angular
        .module("myApp")
        .controller("homeController", homeController);

    function homeController($scope) {
        console.log("in home");
    }
})();