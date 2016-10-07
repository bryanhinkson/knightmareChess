var app = angular.module("houseRulesChess");

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/board', {
        templateUrl: 'board.html',
        controller: 'boardController',
        controllerAs: 'main'
      })
      .when('/board/:username', {
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

app.controller('mainController', function ($scope, $route, $routeParams, $location, $http) {

    // Main Elements ---------------------------------------------------------

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

    // End Main elements -------------------------------------------------------------

    var vm = this;
    vm.username = null;
    vm.password = null;

    vm.login = function(){
        $http({
            method: "GET",
            url: "http://chess.hinksonhosting.com/login.php",
            //url: "http://localhost/houseRulesChessBackend/login.php",
            params: {
                "data": {
                    "username": vm.username,
                    "password": vm.password
                }
            }
        }).then(function (response) {
            if(response.data.loginSuccess === true){
               $location.path("/board/"+response.data.username);
            }              
        });
    }


});

