var app = angular.module("houseRulesChess");

app.controller('boardController', function ($route, $routeParams, $location) {

    // Board elements

    var vm = this;

    vm.ranks = [1, 2, 3, 4, 5, 6, 7, 8];
    vm.files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    vm.whitePalletCells = [
        {'type':'White-Pawn', 'image': 'whitePawn.svg'},
        {'type':'White-Rook', 'image': 'whiteRook.svg'},
        {'type':'White-Knight', 'image': 'whiteKnight.svg'},
        {'type':'White-Bishop', 'image': 'whiteBishop.svg'},
        {'type':'White-King', 'image': 'whiteKing.svg'},
        {'type':'White-Queen', 'image': 'whiteQueen.svg'}];

    vm.blackPalletCells = [
        {'type':'Black-Pawn', 'image': 'blackPawn.svg'},
        {'type':'Black-Rook', 'image': 'blackRook.svg'},
        {'type':'Black-Knight', 'image': 'blackKnight.svg'},
        {'type':'Black-Bishop', 'image': 'blackBishop.svg'},
        {'type':'Black-King', 'image': 'blackKing.svg'},
        {'type':'Black-Queen', 'image': 'blackQueen.svg'}];

    vm.moveStack = [];
    
    vm.showStart = true;
    vm.toggleStart = function(){        
        vm.showStart = !vm.showStart;
    }

    vm.showPiecePallet = false;
    vm.togglePiecePallet = function(){
        vm.showPiecePallet = !vm.showPiecePallet;
    }

    vm.resetPiecePallet = function(){
        for(var i = 0; i < 6; i++){
            document.getElementById('palletPiece-'+vm.whitePalletCells[i].type).innerHTML = '<img class="chessPiece" type="'+vm.whitePalletCells[i].type+'" src="img/'+vm.whitePalletCells[i].image+'">';
            document.getElementById('palletPiece-'+vm.blackPalletCells[i].type).innerHTML = '<img class="chessPiece" type="'+vm.blackPalletCells[i].type+'" src="img/'+vm.blackPalletCells[i].image+'">';
        }
    }

    vm.resetGame = function (ask = true) {
        if(ask){
            if (!confirm("Are you sure you want to reset the board?")) {
                return;
            }
        }

        vm.resetPiecePallet();

        // Reset capture stack
        vm.moveStack = [];

        // Reset selected piece
        vm.selectedPiece = null;

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
            pawns[i].innerHTML = '<img type="White-Pawn" class="chessPiece" src="img/whitePawn.svg">';
        }

        // Set up white Rooks
        var rooks = [document.getElementById('A1'), document.getElementById('H1')];
        for (var i = 0; i < rooks.length; i++) {
            rooks[i].innerHTML = '<img <img type="White-Rook" class="chessPiece" src="img/whiteRook.svg">';
        }

        // Set up white Knights
        var Knights = [document.getElementById('B1'), document.getElementById('G1')];
        for (var i = 0; i < Knights.length; i++) {
            Knights[i].innerHTML = '<img <img type="White-Knight" class="chessPiece" src="img/whiteKnight.svg">';
        }

        // Set up white Bishops
        var Bishops = [document.getElementById('C1'), document.getElementById('F1')];
        for (var i = 0; i < Bishops.length; i++) {
            Bishops[i].innerHTML = '<img <img type="White-Bishop" class="chessPiece" src="img/whiteBishop.svg">';
        }

        // Set up white King
        document.getElementById('E1').innerHTML = '<img <img type="White-King" class="chessPiece" src="img/whiteKing.svg">';

        // Set up white Queen
        document.getElementById('D1').innerHTML = '<img <img type="White-Queen" class="chessPiece" src="img/whiteQueen.svg">';

        // Set up Black
        // Set up Black pawns
        var pawns = [document.getElementById('A7'), document.getElementById('B7'), document.getElementById('C7'), document.getElementById('D7'), document.getElementById('E7'), document.getElementById('F7'), document.getElementById('G7'), document.getElementById('H7')];
        for (var i = 0; i < pawns.length; i++) {
            pawns[i].innerHTML = '<img <img type="Black-Pawn" class="chessPiece" src="img/blackPawn.svg">';
        }

        // Set up Black Rooks
        var rooks = [document.getElementById('A8'), document.getElementById('H8')];
        for (var i = 0; i < rooks.length; i++) {
            rooks[i].innerHTML = '<img type="Black-Rook" class="chessPiece" src="img/blackRook.svg">';
        }

        // Set up Black Knights
        var Knights = [document.getElementById('B8'), document.getElementById('G8')];
        for (var i = 0; i < Knights.length; i++) {
            Knights[i].innerHTML = '<img type="Black-Knight" class="chessPiece" src="img/blackKnight.svg">';
        }

        // Set up Black Bishops
        var Bishops = [document.getElementById('C8'), document.getElementById('F8')];
        for (var i = 0; i < Bishops.length; i++) {
            Bishops[i].innerHTML = '<img type="Black-Bishop" class="chessPiece" src="img/blackBishop.svg">';
        }

        // Set up Black King
        document.getElementById('E8').innerHTML = '<img type="Black-King" class="chessPiece" src="img/blackKing.svg">';

        // Set up Black Queen
        document.getElementById('D8').innerHTML = '<img type="Black-Queen" class="chessPiece" src="img/blackQueen.svg">';

    }

    vm.select = function (e) {
        //This is how we get data for a piece 
        //console.log(e.target.attributes.type.nodeValue);

        // If a piece is already selected then we will move or capture
        if (vm.selectedPiece != null) {

            // If we are moving to a DIV then we don't need to capture
            if (e.target.tagName == "DIV") {
                vm.newLocation = e.target;
                vm.move(vm.newLocation, vm.selectedPiece.parentNode);
            }
            else if (e.target.tagName == "IMG") {
                // If we select the same piece then don't do anything
                if(e.target == vm.selectedPiece){
                    return;
                }

                // If we want to move to where there is an IMG then we need to capture
                vm.newLocation = e.target.parentNode;
                // Pass in where we are going and where we came from
                vm.capture(vm.newLocation, vm.selectedPiece.parentNode);
            }


            return;
        }

        if (e.target.children.length == 0) {
            if (e.target.tagName == "IMG") {
                vm.selectedPiece = e.target;
            }
            else {
                vm.selectedPiece = null;
            }
        }
        else {
            if (e.target.firstChild.tagName == "IMG") {
                vm.selectedPiece = e.target.firstChild;
            }
            else {
                vm.selectedPiece = null;
            }
        }
    }

    vm.move = function (newLocation, oldLocation) {

        // Change the DOM to move the piece
        vm.newLocation.appendChild(vm.selectedPiece)

        // Keep track of where we moved
        vm.moveStack.push({
            'movedPiece': vm.selectedPiece,
            'oldLocation': oldLocation,
            'newLocation': newLocation,
            'capturedPiece': null
        });

        // Reset stuff
        vm.selectedPiece = null;
        vm.newLocation = null;
        vm.resetPiecePallet();
        return;
    }

    vm.capture = function (newLocation, oldLocation) {

        // Change the DOM to Capture the piece
        var capturedPiece = vm.newLocation.firstChild;
        vm.newLocation.removeChild(vm.newLocation.firstChild);
        vm.newLocation.appendChild(vm.selectedPiece);

        // Keep track of where we are moving
        vm.moveStack.push({
            'movedPiece': vm.selectedPiece,
            'oldLocation': oldLocation,
            'newLocation': newLocation,
            'capturedPiece': capturedPiece
        });

        // Reset stuff
        vm.selectedPiece = null;
        vm.newLocation = null;
        vm.resetPiecePallet();
        return;
    }

    vm.undo = function () {
        if (vm.moveStack.length == 0) {
            return;
        }
        // Get the last move
        var move = vm.moveStack.pop();

        // Put the Pieces back
        move.newLocation.removeChild(move.movedPiece);
        if (move.capturedPiece != null) {
            move.newLocation.appendChild(move.capturedPiece);
        }
        move.oldLocation.appendChild(move.movedPiece);

        vm.selectedPiece = null;
    }

});

