var app = angular.module("knightmareChess", []);

app.controller('mainController', function($scope){
    $scope.ranks = [1,2,3,4,5,6,7,8];
    $scope.files = ['A','B','C','D','E','F','G','H'];


    $scope.startGame = function(){
        // Set up white
        // Set up white pawns
        var pawns = [document.getElementById('A2'),document.getElementById('B2'),document.getElementById('C2'),document.getElementById('D2'),document.getElementById('E2'),document.getElementById('F2'),document.getElementById('G2'),document.getElementById('H2')];
        for(var i=0; i < pawns.length; i++){
            pawns[i].innerText= "Pawn";
        }            

        // Set up white Rooks
        var rooks = [document.getElementById('A1'),document.getElementById('H1')];
        for(var i=0; i < rooks.length; i++){
            rooks[i].innerText= "Rook";
        }

        // Set up white Knights
        var Knights = [document.getElementById('B1'),document.getElementById('G1')];
        for(var i=0; i < Knights.length; i++){
            Knights[i].innerText= "Knight";
        }

        // Set up white Bishops
        var Bishops = [document.getElementById('C1'),document.getElementById('F1')];
        for(var i=0; i < Bishops.length; i++){
            Bishops[i].innerText= "Bishop";
        }

        // Set up white King
        document.getElementById('E1').innerText = "King";

        // Set up white Queen
        document.getElementById('D1').innerText = "Queen";

        // Set up Black
        // Set up Black pawns
        var pawns = [document.getElementById('A7'),document.getElementById('B7'),document.getElementById('C7'),document.getElementById('D7'),document.getElementById('E7'),document.getElementById('F7'),document.getElementById('G7'),document.getElementById('H7')];
        for(var i=0; i < pawns.length; i++){
            pawns[i].innerText= "Pawn";
        }            

        // Set up Black Rooks
        var rooks = [document.getElementById('A8'), document.getElementById('H8')];
        for(var i=0; i < rooks.length; i++){
            rooks[i].innerText= "Rook";
        }

        // Set up Black Knights
        var Knights = [document.getElementById('B8'), document.getElementById('G8')];
        for(var i=0; i < Knights.length; i++){
            Knights[i].innerText= "Knight";
        }

        // Set up Black Bishops
        var Bishops = [document.getElementById('C8'), document.getElementById('F8')];
        for(var i=0; i < Bishops.length; i++){
            Bishops[i].innerText= "Bishop";
        }

        // Set up Black King
        document.getElementById('E8').innerText = "King";

        // Set up Black Queen
        document.getElementById('D8').innerText = "Queen";

    }


});