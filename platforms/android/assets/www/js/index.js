var app = angular.module("knightmareChess", []);

app.controller('mainController', function($scope){
    $scope.ranks = [1,2,3,4,5,6,7,8];
    $scope.files = ['A','B','C','D','E','F','G','H'];
});