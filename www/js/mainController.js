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

    vm.apiUrl = "http://chess.hinksonhosting.com/api";
    //vm.apiUrl = "http://localhost/houseRulesChessBackend/api/login.php"

    vm.username = null;
    vm.password = null;
    vm.confirmPassword = null;
    vm.errorMessage = null;

    vm.noErrors = true;
    vm.checkPasswordsMatch = function(){
        if(vm.username && vm.password && vm.confirmPassword){
            if(vm.confirmPassword == vm.password){
                vm.noErrors = true;
                vm.createAccount();
            }
            else{
                vm.noErrors = false;
                vm.errorMessage = "Passwords don't match";
            }
        }
        else{
            vm.noErrors = false;
            vm.errorMessage = "All fields are required.";
        }
    }

    vm.showCreateAccount = false;
    vm.toggleCreateAccount = function () {
        vm.showCreateAccount = !vm.showCreateAccount;
    }

    vm.localPlay = function(){
        $location.path("/board/PlayLocallyOnly");
    }

    vm.login = function(){
        $http({
            method: "GET",
            url: vm.apiUrl + "/login.php",
            
            params: {
                "data": {
                    "username": vm.username,
                    "password": vm.password
                }
            }
        }).then(function (response) {
            if(response.data.loginSuccess){
               $location.path("/board/"+response.data.username);
            }              
        });
    }

    vm.createAccount = function(){
        $http({
            method: "GET",
            url: vm.apiUrl + "/createAccount.php",
            
            params: {
                "data": {
                    "username": vm.username,
                    "password": vm.password
                }
            }
        }).then(function (response) {
            if(response.data.error){
                alert('It looks like there was an error, and we are unable to create the account.  Please try again later.');
            }
            if(response.data.userExists){
               alert("It looks like that user already exists, please use a different username");
            }
            else if(!response.data.error) {
                $location.path("/board/"+response.data.username);
            }              
        });
    }


});

