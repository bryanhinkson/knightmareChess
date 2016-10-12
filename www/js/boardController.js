var app = angular.module("houseRulesChess");

app.controller('boardController', function ($route, $routeParams, $location, $http) {

    // Board elements

    var vm = this;

    //Ok so this isn't really a username but I don't think anyone will pick that one :)
    if($routeParams.username == "PlayLocallyOnly"){
        vm.PlayLocallyOnly = true;
    }
    else{
        vm.PlayLocallyOnly = false;
    }

    vm.user = $routeParams.username;

    vm.playerMe = vm.user;
    vm.playerOpponent = "";

    vm.gameStarted = false;

    //vm.apiUrl = "http://localhost/houseRulesChessBackend/api";
    vm.apiUrl = "http://chess.hinksonhosting.com/api";

    vm.users = [];
    vm.getUsers = function(){
        $http({
            method: "GET",
            url: vm.apiUrl + "/getUsers.php"
        }).then(function (response) {
            for(var i = 0; i < response.data.users.length; i++){
                vm.users.push(response.data.users[i].username.toUpperCase());
            }
        });

    }
    vm.getUsers();

    vm.playerTurn = vm.playerMe;

    vm.ranks = [1, 2, 3, 4, 5, 6, 7, 8];
    vm.files = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    vm.whitePalletCells = [
        { 'type': 'White-Pawn', 'image': 'whitePawn.svg' },
        { 'type': 'White-Rook', 'image': 'whiteRook.svg' },
        { 'type': 'White-Knight', 'image': 'whiteKnight.svg' },
        { 'type': 'White-Bishop', 'image': 'whiteBishop.svg' },
        { 'type': 'White-King', 'image': 'whiteKing.svg' },
        { 'type': 'White-Queen', 'image': 'whiteQueen.svg' }];

    vm.blackPalletCells = [
        { 'type': 'Black-Pawn', 'image': 'blackPawn.svg' },
        { 'type': 'Black-Rook', 'image': 'blackRook.svg' },
        { 'type': 'Black-Knight', 'image': 'blackKnight.svg' },
        { 'type': 'Black-Bishop', 'image': 'blackBishop.svg' },
        { 'type': 'Black-King', 'image': 'blackKing.svg' },
        { 'type': 'Black-Queen', 'image': 'blackQueen.svg' }];

    vm.moveStack = [];

    vm.showStart = true;
    vm.toggleStart = function () {
        vm.showStart = !vm.showStart;
    }

    vm.showPiecePallet = false;
    vm.togglePiecePallet = function () {
        vm.showPiecePallet = !vm.showPiecePallet;
    }

    vm.resetPiecePallet = function () {
        for (var i = 0; i < 6; i++) {
            document.getElementById('palletPiece-' + vm.whitePalletCells[i].type).innerHTML = '<img class="chessPiece" type="' + vm.whitePalletCells[i].type + '" src="img/' + vm.whitePalletCells[i].image + '">';
            document.getElementById('palletPiece-' + vm.blackPalletCells[i].type).innerHTML = '<img class="chessPiece" type="' + vm.blackPalletCells[i].type + '" src="img/' + vm.blackPalletCells[i].image + '">';
        }
    }

    // CONFIGURATIONS
    vm.startingBoardConfig = {
        "A1": "White-Rook", "A2": "White-Pawn", "A7": "Black-Pawn", "A8": "Black-Rook",
        "B1": "White-Knight", "B2": "White-Pawn", "B7": "Black-Pawn", "B8": "Black-Knight",
        "C1": "White-Bishop", "C2": "White-Pawn", "C7": "Black-Pawn", "C8": "Black-Bishop",
        "D1": "White-Queen", "D2": "White-Pawn", "D7": "Black-Pawn", "D8": "Black-Queen",
        "E1": "White-King", "E2": "White-Pawn", "E7": "Black-Pawn", "E8": "Black-King",
        "F1": "White-Bishop", "F2": "White-Pawn", "F7": "Black-Pawn", "F8": "Black-Bishop",
        "G1": "White-Knight", "G2": "White-Pawn", "G7": "Black-Pawn", "G8": "Black-Knight",
        "H1": "White-Rook", "H2": "White-Pawn", "H7": "Black-Pawn", "H8": "Black-Rook"
    }

    vm.blankBoardConfig = {
        "A1": "", "A2": "", "A3": "", "A4": "", "A5": "", "A6": "", "A7": "", "A8": "",
        "B1": "", "B2": "", "B3": "", "B4": "", "B5": "", "B6": "", "B7": "", "B8": "",
        "C1": "", "C2": "", "C3": "", "C4": "", "C5": "", "C6": "", "C7": "", "C8": "",
        "D1": "", "D2": "", "D3": "", "D4": "", "D5": "", "D6": "", "D7": "", "D8": "",
        "E1": "", "E2": "", "E3": "", "E4": "", "E5": "", "E6": "", "E7": "", "E8": "",
        "F1": "", "F2": "", "F3": "", "F4": "", "F5": "", "F6": "", "F7": "", "F8": "",
        "G1": "", "G2": "", "G3": "", "G4": "", "G5": "", "G6": "", "G7": "", "G8": "",
        "H1": "", "H2": "", "H3": "", "H4": "", "H5": "", "H6": "", "H7": "", "H8": ""
    }

    vm.boardConfig = vm.startingBoardConfig;
    // END CONFIGURATIONS

    // Map the piece types to there respective images
    vm.pieceMap = {
        "White-Pawn": "whitePawn.svg", "White-Knight": "whiteKnight.svg", "White-Bishop": "whiteBishop.svg", "White-Rook": "whiteRook.svg", "White-King": "whiteKing.svg", "White-Queen": "whiteQueen.svg",
        "Black-Pawn": "blackPawn.svg", "Black-Knight": "blackKnight.svg", "Black-Bishop": "blackBishop.svg", "Black-Rook": "blackRook.svg", "Black-King": "blackKing.svg", "Black-Queen": "blackQueen.svg"
    }

    vm.resetGame = function (ask = true) {
        vm.gameStarted = true;

        if (ask) {
            if (!confirm("Are you sure you want to reset the board?")) {
                return;
            }
        }

        vm.resetPiecePallet();

        vm.moveStack = [];

        vm.selectedPiece = null;

        vm.clearBoard();

        // Set up Board with the starting JSON config
        vm.populateJsonBoard(vm.startingBoardConfig);
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
                if (e.target == vm.selectedPiece) {
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
        vm.makeBoardJson();
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
        vm.makeBoardJson();
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

    vm.clearBoard = function () {
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
    }

    vm.makeBoardJson = function () {
        // Get snapshot of board and make a JSON board config out of it
        vm.boardConfig = {};

        //if something in the divs then it is a piece so we need to record it
        for (var i = 1; i <= 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (document.getElementById(vm.files[j] + i).innerHTML) {
                    vm.boardConfig[vm.files[j] + i] = document.getElementById(vm.files[j] + i).firstChild.getAttribute('type');
                }
            }
        }
    }

    vm.populateJsonBoard = function (boardConfig = vm.boardConfig) {
        vm.clearBoard();
        for (var square in boardConfig) {
            var pieceType = boardConfig[square];
            document.getElementById(square).innerHTML = '<img type="' + pieceType + '" class="chessPiece" src="img/' + vm.pieceMap[pieceType] + '">';
        }
    }

    vm.sendMovesToServer = function () {
        vm.gameStarted = true;
        $http({
            method: "GET",
            url: vm.apiUrl + "/saveGame.php",
            params: {
                "data": {
                    "player1": vm.playerMe,
                    "player2": vm.playerOpponent,
                    "playerTurn": vm.playerOpponent,
                    "game": JSON.stringify(vm.boardConfig)
                }
            }
        }).then(function (response) {
            if (!response.data) {
                alert("An error occured, we were not able to record that move");
                return;
            }
        });
        vm.playerTurn = vm.playerOpponent;
        vm.poll();
    }

    vm.refresh = function (force = false) {
        $http({
            method: "GET",
            url: vm.apiUrl + "/loadGame.php",
            params: {
                "data": {
                    "player1": vm.playerMe,
                    "player2": vm.playerOpponent,
                }
            }
        }).then(function (response) {
            if (response.data.playerTurn == vm.playerMe) {
                vm.gameStarted = true;
                vm.playerTurn = response.data.playerTurn;
                vm.populateJsonBoard(JSON.parse(response.data.game));
            }
            else {
                if(force){
                    alert("They haven't moved yet");
                }
            }
        });

    }

    vm.poll = function() {
        setTimeout(function () {
            if (vm.playerTurn != vm.playerMe) {
                vm.refresh();

                // recursive call
                vm.poll();
            }
            else {
                return;
            }
        }, 10000);
    };


});

