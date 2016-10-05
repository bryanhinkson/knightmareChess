var app = angular.module("houseRulesChess");

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/board', {
        templateUrl: 'board.html',
        controller: 'boardController',
        controllerAs: 'main'
      })
      .when('/credits', {
        templateUrl: 'credits.html',
        controller: 'mainController',
        controllerAs: 'main'
      })
      .otherwise({
          templateUrl: 'home.html',
          controller: 'mainController',
          controllerAs: 'main'
      });
}]);

app.controller('mainController', function ($scope, $route, $routeParams, $location) {

    // Main elements

    $scope.showNav = false;
    $scope.toggleNav = function (e, close = false) {
        e.stopPropagation();
        if(close == 'keepAlive'){
            return;
        }
        if(close == true){
            $scope.showNav = false;
            return;
        }
        else{
            $scope.showNav = !$scope.showNav;
        }        
    }
});

