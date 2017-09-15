(function () {

    angular
        .module("myApp")
        .controller("aboutmeController", aboutmeController);

    function aboutmeController($scope) {

       console.log("in about me");
    }
})();