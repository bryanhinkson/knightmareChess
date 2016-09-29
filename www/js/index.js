var app = angular.module("houseRulesChess", []);

app.controller('mainController', function ($scope) {

    $scope.ranks = [1, 2, 3, 4, 5, 6, 7, 8];
    $scope.files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    $scope.moveStack = [];
    
    $scope.showStart = true;
    $scope.toggleStart = function(){
        $scope.showStart = !$scope.showStart;
    }

    $scope.showNav = false;
    $scope.toggleNav = function () {
        $scope.showNav = !$scope.showNav;
    }


    $scope.resetGame = function (ask = true) {
        if(ask){
            if (!confirm("Are you sure you want to reset the board?")) {
                return;
            }
        }


        // Reset capture stack
        $scope.moveStack = [];

        // Reset selected piece
        $scope.selectedPiece = null;

        // Clear Board
        for (var i = 1; i <= 8; i++) {
            document.getElementById('A' + i).innerHTML = "";
            document.getElementById('B' + i).innerHTML = "";
            document.getElementById('C' + i).innerHTML = "";
            document.getElementById('D' + i).innerHTML = "";
            document.getElementById('E' + i).innerHTML = "";
            document.getElementById('F' + i).innerHTML = "";
            document.getElementById('G' + i).innerHTML = "";
            document.getElementById('H' + i).innerHTML = "";
        }

        // Set up white
        // Set up white pawns
        var pawns = [document.getElementById('A2'), document.getElementById('B2'), document.getElementById('C2'), document.getElementById('D2'), document.getElementById('E2'), document.getElementById('F2'), document.getElementById('G2'), document.getElementById('H2')];
        for (var i = 0; i < pawns.length; i++) {
            pawns[i].innerHTML = '<img class="chessPiece" src="img/whitePawn.svg">';
        }

        // Set up white Rooks
        var rooks = [document.getElementById('A1'), document.getElementById('H1')];
        for (var i = 0; i < rooks.length; i++) {
            rooks[i].innerHTML = '<img class="chessPiece" src="img/whiteRook.svg">';
        }

        // Set up white Knights
        var Knights = [document.getElementById('B1'), document.getElementById('G1')];
        for (var i = 0; i < Knights.length; i++) {
            Knights[i].innerHTML = '<img class="chessPiece" src="img/whiteKnight.svg">';
        }

        // Set up white Bishops
        var Bishops = [document.getElementById('C1'), document.getElementById('F1')];
        for (var i = 0; i < Bishops.length; i++) {
            Bishops[i].innerHTML = '<img class="chessPiece" src="img/whiteBishop.svg">';
        }

        // Set up white King
        document.getElementById('E1').innerHTML = '<img class="chessPiece" src="img/whiteKing.svg">';

        // Set up white Queen
        document.getElementById('D1').innerHTML = '<img class="chessPiece" src="img/whiteQueen.svg">';

        // Set up Black
        // Set up Black pawns
        var pawns = [document.getElementById('A7'), document.getElementById('B7'), document.getElementById('C7'), document.getElementById('D7'), document.getElementById('E7'), document.getElementById('F7'), document.getElementById('G7'), document.getElementById('H7')];
        for (var i = 0; i < pawns.length; i++) {
            pawns[i].innerHTML = '<img class="chessPiece" src="img/blackPawn.svg">';
        }

        // Set up Black Rooks
        var rooks = [document.getElementById('A8'), document.getElementById('H8')];
        for (var i = 0; i < rooks.length; i++) {
            rooks[i].innerHTML = '<img class="chessPiece" src="img/blackRook.svg">';
        }

        // Set up Black Knights
        var Knights = [document.getElementById('B8'), document.getElementById('G8')];
        for (var i = 0; i < Knights.length; i++) {
            Knights[i].innerHTML = '<img class="chessPiece" src="img/blackKnight.svg">';
        }

        // Set up Black Bishops
        var Bishops = [document.getElementById('C8'), document.getElementById('F8')];
        for (var i = 0; i < Bishops.length; i++) {
            Bishops[i].innerHTML = '<img class="chessPiece" src="img/blackBishop.svg">';
        }

        // Set up Black King
        document.getElementById('E8').innerHTML = '<img class="chessPiece" src="img/blackKing.svg">';

        // Set up Black Queen
        document.getElementById('D8').innerHTML = '<img class="chessPiece" src="img/blackQueen.svg">';

    }

    $scope.select = function (e) {
        // If a piece is already selected then we will move or capture
        if ($scope.selectedPiece != null) {

            // If we are moving to a DIV then we don't need to capture
            if (e.target.tagName == "DIV") {
                $scope.newLocation = e.target;
                $scope.move($scope.newLocation, $scope.selectedPiece.parentNode);
            }
            else if (e.target.tagName == "IMG") {
                // If we select the same piece then don't do anything
                if(e.target == $scope.selectedPiece){
                    console.log("You selected the same piece");
                    return;
                }

                // If we want to move to where there is an IMG then we need to capture
                $scope.newLocation = e.target.parentNode;
                // Pass in where we are going and where we came from
                $scope.capture($scope.newLocation, $scope.selectedPiece.parentNode);
            }


            return;
        }

        if (e.target.children.length == 0) {
            if (e.target.tagName == "IMG") {
                $scope.selectedPiece = e.target;
            }
            else {
                $scope.selectedPiece = null;
            }
        }
        else {
            if (e.target.firstChild.tagName == "IMG") {
                $scope.selectedPiece = e.target.firstChild;
            }
            else {
                $scope.selectedPiece = null;
            }
        }
        console.log($scope.selectedPiece);


    }

    $scope.move = function (newLocation, oldLocation) {

        // Change the DOM to move the piece
        $scope.selectedPiece.parentNode.removeChild($scope.selectedPiece);
        $scope.newLocation.appendChild($scope.selectedPiece)

        // Keep track of where we moved
        $scope.moveStack.push({
            'movedPiece': $scope.selectedPiece,
            'oldLocation': oldLocation,
            'newLocation': newLocation,
            'capturedPiece': null
        });

        // Reset stuff
        $scope.selectedPiece = null;
        $scope.newLocation = null;
        return;
    }

    $scope.capture = function (newLocation, oldLocation) {

        // Change the DOM to Capture the piece
        var capturedPiece = $scope.newLocation.firstChild;
        $scope.newLocation.removeChild($scope.newLocation.firstChild);
        $scope.selectedPiece.parentNode.removeChild($scope.selectedPiece);
        $scope.newLocation.appendChild($scope.selectedPiece);

        // Keep track of where we are moving
        $scope.moveStack.push({
            'movedPiece': $scope.selectedPiece,
            'oldLocation': oldLocation,
            'newLocation': newLocation,
            'capturedPiece': capturedPiece
        });

        // Reset stuff
        $scope.selectedPiece = null;
        $scope.newLocation = null;
        return;
    }

    $scope.undo = function () {
        if ($scope.moveStack.length == 0) {
            return;
        }
        // Get the last move
        var move = $scope.moveStack.pop();

        // Put the Pieces back
        move.newLocation.removeChild(move.movedPiece);
        if (move.capturedPiece != null) {
            move.newLocation.appendChild(move.capturedPiece);
        }
        move.oldLocation.appendChild(move.movedPiece);
    }

});