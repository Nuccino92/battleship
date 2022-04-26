/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/displayController/domElements.js":
/*!******************************************************!*\
  !*** ./src/modules/displayController/domElements.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "domElements": () => (/* binding */ domElements),
/* harmony export */   "startDOMManipulation": () => (/* binding */ startDOMManipulation),
/* harmony export */   "restartDOMManipulation": () => (/* binding */ restartDOMManipulation),
/* harmony export */   "toggleHorizontalClass": () => (/* binding */ toggleHorizontalClass),
/* harmony export */   "chatBoxController": () => (/* binding */ chatBoxController),
/* harmony export */   "toggleClickBlocker": () => (/* binding */ toggleClickBlocker)
/* harmony export */ });
// eslint-disable-next-line import/prefer-default-export
var domElements = {
  playerGameboard: document.querySelector(".player-board"),
  computerGameboard: document.querySelector(".computer-board"),
  setupContainer: document.querySelector(".setup-container"),
  shipSetupContainer: document.querySelector(".ship-setup-container"),
  rotateButton: document.querySelector(".rotate-ships"),
  shipCell: document.querySelector(".ship-cell"),
  startButton: document.querySelector(".start-button"),
  startButtonContainer: document.querySelector(".start-button-container"),
  modalContainer: document.querySelector(".modal-container"),
  modal: document.querySelector(".modal"),
  playAgain: document.querySelector(".play-again"),
  winner: document.querySelector(".display-winner"),
  crosshairX: document.querySelector(".crosshairX"),
  crosshairY: document.querySelector(".crosshairY"),
  chatContainer: document.querySelector(".chat-container"),
  chatBox: document.querySelector(".chat-box"),
  chatText: document.querySelector(".chat-text"),
  resetButton: document.querySelector(".reset-button")
};
function startDOMManipulation() {
  domElements.setupContainer.classList.add("remove");
  domElements.computerGameboard.classList.add("active");
  domElements.startButtonContainer.classList.remove("active");
  domElements.shipSetupContainer.classList.remove("horizontal");
  domElements.playerGameboard.classList.toggle("transform");
  domElements.crosshairX.classList.add("active");
  domElements.crosshairY.classList.add("active");
  domElements.chatContainer.classList.add("active");
  domElements.chatText.textContent = "Get ready and fire!";
}
function restartDOMManipulation() {
  domElements.modalContainer.classList.remove("active");
  domElements.playerGameboard.classList.toggle("transform");
  domElements.setupContainer.classList.remove("remove");
  domElements.computerGameboard.classList.remove("active");
  domElements.crosshairX.classList.remove("active");
  domElements.crosshairY.classList.remove("active");
  domElements.chatContainer.classList.remove("active");
}
function toggleHorizontalClass() {
  domElements.shipSetupContainer.childNodes.forEach(function (node) {
    node.classList.toggle("horizontal");
  });
  document.querySelector(".ship-setup-container").classList.toggle("horizontal");
}

function resetAnimation() {
  var text = domElements.chatText;
  var container = domElements.chatContainer;
  text.style.animation = "none";
  text.offsetHeight;
  text.style.animation = null;
  container.style.animation = "none";
  container.offsetHeight;
  container.style.animation = null;
}

function chatBoxController(location, player) {
  resetAnimation();
  var text = domElements.chatText;
  var container = domElements.chatContainer;

  function playerHits() {
    text.textContent = "You hit a ship!";
    text.style.animation = "printing 1s steps(40, end)";
    container.style.animation = "hit 1s linear";
  }

  function playerMissed() {
    text.textContent = "You missed.";
    text.style.animation = "printing 1s steps(40, end)";
    container.style.animation = "miss 1s linear";
  }

  function computerShipSunk() {
    text.textContent = "You Sunk a Ship!";
    text.style.animation = "printing 1s steps(40, end)";
    container.style.animation = "sunk 2s linear";
  }

  function computerHits() {
    text.textContent = "You were Hit!";
    text.style.animation = "printing 1s steps(40, end)";
    container.style.animation = "hit 1s linear";
  }

  function computerMissed() {
    text.textContent = "They missed.";
    text.style.animation = "printing 1s steps(40, end)";
    container.style.animation = "miss 1s linear";
  }

  function playerShipSunk() {
    text.textContent = "They sunk a Ship!";
    text.style.animation = "sunk 1s steps(40, end)";
    container.style.animation = "sunk 2s linear";
  }

  if (location === "reset") {
    text.textContent = "Get back here!";
    text.style.animation = "printing 1s steps(40, end)";
    return;
  }

  if (location === null) {
    if (player === "human") playerMissed();else computerMissed();
  }

  if (location !== null) {
    if (player === "human") {
      if (location.isShipSunk === true) computerShipSunk();else playerHits();
    } else if (location.isShipSunk === true) playerShipSunk();else computerHits();
  }
} // toggles click event blocker every turn

function toggleClickBlocker() {
  domElements.computerGameboard.classList.toggle("blocker");
}

/***/ }),

/***/ "./src/modules/displayController/drag.js":
/*!***********************************************!*\
  !*** ./src/modules/displayController/drag.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _fleet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../fleet */ "./src/modules/fleet.js");
/* harmony import */ var _domElements__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domElements */ "./src/modules/displayController/domElements.js");
/* harmony import */ var _renderController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderController */ "./src/modules/displayController/renderController.js");




function Drag(playerBoard, playerFleet) {
  function dragEventListeners() {
    var ships = document.querySelectorAll(".ship");
    var cells = document.querySelectorAll(".grid-cell");
    var crosshairX = _domElements__WEBPACK_IMPORTED_MODULE_1__.domElements.crosshairX;
    var crosshairY = _domElements__WEBPACK_IMPORTED_MODULE_1__.domElements.crosshairY;
    ships.forEach(function (ship) {
      return ship.addEventListener("dragstart", dragStart);
    });
    cells.forEach(function (cell) {
      return cell.addEventListener("dragover", dragOver);
    });
    cells.forEach(function (cell) {
      return cell.addEventListener("dragenter", dragEnter);
    });
    cells.forEach(function (cell) {
      return cell.addEventListener("drop", dragDrop);
    });
    ships.forEach(function (ship) {
      return ship.addEventListener("drag", drag);
    });
    ships.forEach(function (ship) {
      return ship.addEventListener("mousedown", function (e) {
        selectedShipNameWithIndex = e.target;
      });
    });
    ships.forEach(function (ship) {
      return ship.addEventListener("dragend", function (e) {
        e.target.style.transform = "scale(1)";
      });
    });
    _domElements__WEBPACK_IMPORTED_MODULE_1__.domElements.computerGameboard.addEventListener("mousemove", function (e) {
      crosshairX.style.left = e.clientX + "px", crosshairX.style.top = e.clientY + "px";
      crosshairY.style.left = e.clientX + "px", crosshairY.style.top = e.clientY + "px";
    });
  }

  var selectedShipNameWithIndex;
  var draggedShip;

  function drag(e) {
    draggedShip = e.target;
    draggedShip.style.transform = "scale(0)";
  }

  function dragStart(e) {
    draggedShip = e.target;
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
  }

  function dragDrop(e) {
    var cell = e.target;
    var name = draggedShip.dataset.name;
    var ship = (0,_fleet__WEBPACK_IMPORTED_MODULE_0__.matchShip)(playerFleet, name);
    var index = Number(selectedShipNameWithIndex.dataset.index);
    var x = Number(cell.dataset.x);
    var y = Number(cell.dataset.y); // gets the correct starting point

    if (ship.direction === "vertical") {
      x = x - index;
    } // gets the correct starting point


    if (ship.direction === "horizontal") {
      y = y - index;
    }

    var placed = playerBoard.placeShips(ship, x, y);

    if (placed) {
      draggedShip.remove();
      (0,_renderController__WEBPACK_IMPORTED_MODULE_2__["default"])().renderBoard(_domElements__WEBPACK_IMPORTED_MODULE_1__.domElements.playerGameboard, playerBoard);
      dragEventListeners(); // checks if all the 5 ships have been placed

      if (playerBoard.placedShips.length === 5) {
        _domElements__WEBPACK_IMPORTED_MODULE_1__.domElements.setupContainer.classList.add("remove");
        _domElements__WEBPACK_IMPORTED_MODULE_1__.domElements.startButtonContainer.classList.add("active");
      }
    }
  }

  return {
    dragEventListeners: dragEventListeners
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Drag);

/***/ }),

/***/ "./src/modules/displayController/renderController.js":
/*!***********************************************************!*\
  !*** ./src/modules/displayController/renderController.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _domElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domElements */ "./src/modules/displayController/domElements.js");


function renderController() {
  function checkForShip(board, x, y, cell) {
    if (board[x][y] != null) {
      return cell.classList.add(board[x][y].name);
    }
  }

  function checkForAttack(board, x, y, cell) {
    if (board[x][y] === "hit") {
      cell.classList.add("hit");
    }

    if (board[x][y] === "miss") {
      cell.classList.add("miss");
    }
  }

  function createCell(dom, x, y, type, board) {
    var cell = document.createElement("div");
    cell.classList.add("grid-cell");
    checkForShip(board, x, y, cell);
    checkForAttack(board, x, y, cell);
    cell.id = type;
    cell.setAttribute("data-x", "".concat(x));
    cell.setAttribute("data-y", "".concat(y));
    dom.append(cell);
  }

  function renderBoard(dom, boardRecieved, type) {
    dom.textContent = "";
    var board = boardRecieved.getBoard();
    board.forEach(function (x) {
      board.forEach(function (y) {
        var row = board.indexOf(x);
        var col = board.indexOf(y);
        createCell(dom, row, col, type, board);
      });
    });
  }

  function renderShip(ship) {
    var container = document.createElement("div");
    container.classList.add("ship", "".concat(ship.name, "-container"));
    container.setAttribute("data-name", "".concat(ship.name));
    container.setAttribute("draggable", true);
    var shipDiv = "";

    for (var i = 0; i < ship.length; i += 1) {
      shipDiv += "<div class=\"ship-cell\" data-index='".concat(i, "'></div>");
    }

    container.insertAdjacentHTML("afterbegin", shipDiv);
    _domElements__WEBPACK_IMPORTED_MODULE_0__.domElements.shipSetupContainer.append(container);
  }

  function renderFleet(ships) {
    ships.forEach(function (ship) {
      renderShip(ship);
    });
  }

  return {
    renderBoard: renderBoard,
    renderFleet: renderFleet,
    checkForShip: checkForShip
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renderController);

/***/ }),

/***/ "./src/modules/fleet.js":
/*!******************************!*\
  !*** ./src/modules/fleet.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fleet": () => (/* binding */ fleet),
/* harmony export */   "createShips": () => (/* binding */ createShips),
/* harmony export */   "matchShip": () => (/* binding */ matchShip)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");

var shipInfo = [["Carrier", 5], ["Battleship", 4], ["Cruiser", 3], ["Submarine", 3], ["Destroyer", 2]];

var createShips = function createShips() {
  var shipArray = [];
  shipInfo.forEach(function (ship) {
    shipArray.push((0,_ship__WEBPACK_IMPORTED_MODULE_0__["default"])(ship[0], ship[1]));
  });
  return shipArray;
}; // fleet used mainly for the testing


function fleet() {
  var Carrier = function Carrier() {
    return new _ship__WEBPACK_IMPORTED_MODULE_0__["default"]("Carrier", 5);
  };

  var Battleship = function Battleship() {
    return new _ship__WEBPACK_IMPORTED_MODULE_0__["default"]("Battleship", 4);
  };

  var Cruiser = function Cruiser() {
    return new _ship__WEBPACK_IMPORTED_MODULE_0__["default"]("Cruiser", 3);
  };

  var Submarine = function Submarine() {
    return new _ship__WEBPACK_IMPORTED_MODULE_0__["default"]("Submarine", 3);
  };

  var Destroyer = function Destroyer() {
    return new _ship__WEBPACK_IMPORTED_MODULE_0__["default"]("Destroyer", 2);
  };

  return {
    Carrier: Carrier,
    Battleship: Battleship,
    Cruiser: Cruiser,
    Submarine: Submarine,
    Destroyer: Destroyer
  };
}

function matchShip(playerFleet, name) {
  var matchedShip;
  playerFleet.forEach(function (ship) {
    if (ship.name === name) {
      matchedShip = ship;
    }
  });
  return matchedShip;
}



/***/ }),

/***/ "./src/modules/gameLoop.js":
/*!*********************************!*\
  !*** ./src/modules/gameLoop.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _displayController_domElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./displayController/domElements */ "./src/modules/displayController/domElements.js");
/* harmony import */ var _fleet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fleet */ "./src/modules/fleet.js");
/* harmony import */ var _displayController_renderController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./displayController/renderController */ "./src/modules/displayController/renderController.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");
/* harmony import */ var _displayController_drag__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./displayController/drag */ "./src/modules/displayController/drag.js");







function Game() {
  var playerFleet = (0,_fleet__WEBPACK_IMPORTED_MODULE_1__.createShips)();
  var cpuFleet = (0,_fleet__WEBPACK_IMPORTED_MODULE_1__.createShips)();
  var player = (0,_player__WEBPACK_IMPORTED_MODULE_4__["default"])("human");
  var computer = (0,_player__WEBPACK_IMPORTED_MODULE_4__["default"])("computer");
  var playerBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_3__["default"]();
  var computerBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_3__["default"]();

  function gameOver(playerBoard, computerBoard) {
    if (playerBoard.checkGameOver() === true) {
      _displayController_domElements__WEBPACK_IMPORTED_MODULE_0__.domElements.modalContainer.classList.add("active");
      _displayController_domElements__WEBPACK_IMPORTED_MODULE_0__.domElements.winner.innerText = "You Lost";
      return true;
    }

    if (computerBoard.checkGameOver() === true) {
      _displayController_domElements__WEBPACK_IMPORTED_MODULE_0__.domElements.modalContainer.classList.add("active");
      _displayController_domElements__WEBPACK_IMPORTED_MODULE_0__.domElements.winner.innerText = "You Win!";
      return true;
    }

    return false;
  }

  function boardAttack(e) {
    var cell = e.target;
    if (cell.id !== "computer") return;
    var x = cell.dataset.x;
    var y = cell.dataset.y;

    function compAttack() {
      var rand = Math.round(Math.random() * (2000 - 500)) + 1000;
      setTimeout(function () {
        computer.randomAttack(playerBoard);
        (0,_displayController_renderController__WEBPACK_IMPORTED_MODULE_2__["default"])().renderBoard(_displayController_domElements__WEBPACK_IMPORTED_MODULE_0__.domElements.playerGameboard, playerBoard, computer.player); // checking if games over

        if (gameOver(playerBoard, computerBoard) === true) return;
        _displayController_domElements__WEBPACK_IMPORTED_MODULE_0__.domElements.computerGameboard.style.border = "3px solid red";
        _displayController_domElements__WEBPACK_IMPORTED_MODULE_0__.domElements.playerGameboard.style.border = "3px solid white";
        (0,_displayController_domElements__WEBPACK_IMPORTED_MODULE_0__.toggleClickBlocker)();
      }, rand);
    }

    player.placeAttack(x, y, computerBoard);

    if (player.placeAttack) {
      if (computerBoard.board[x][y] === "hit") {
        e.target.classList.add("hit");
      }

      if (computerBoard.board[x][y] === "miss") {
        e.target.classList.add("miss");
      }

      if (gameOver(playerBoard, computerBoard) === true) return;
      (0,_displayController_domElements__WEBPACK_IMPORTED_MODULE_0__.toggleClickBlocker)();
      _displayController_domElements__WEBPACK_IMPORTED_MODULE_0__.domElements.playerGameboard.style.border = "3px solid red";
      _displayController_domElements__WEBPACK_IMPORTED_MODULE_0__.domElements.computerGameboard.style.border = "3px solid white";
      compAttack();
    }
  }

  function gridListener() {
    var grid = document.querySelectorAll(".grid-cell");
    grid.forEach(function (cell) {
      return cell.addEventListener("click", function (e) {
        boardAttack(e);
      }, {
        once: true
      });
    });
  }

  function fleetChangeDirection() {
    playerFleet.forEach(function (ship) {
      ship.changeDirection();
    });
  }

  function renderGameboards() {
    (0,_displayController_renderController__WEBPACK_IMPORTED_MODULE_2__["default"])().renderBoard(_displayController_domElements__WEBPACK_IMPORTED_MODULE_0__.domElements.playerGameboard, playerBoard, player.player);
    (0,_displayController_renderController__WEBPACK_IMPORTED_MODULE_2__["default"])().renderBoard(_displayController_domElements__WEBPACK_IMPORTED_MODULE_0__.domElements.computerGameboard, computerBoard, computer.player);
  }

  function placeSingle(ship) {
    var x = Math.round(Math.random() * 9);
    var y = Math.round(Math.random() * 9);
    var changeDirection = Math.random() > 0.5;
    if (changeDirection) ship.changeDirection();
    var placed = computerBoard.placeShips(ship, x, y);
    if (!placed) placeSingle(ship);
  }

  function autoPlaceShips() {
    cpuFleet.forEach(function (ship) {
      var x = Math.round(Math.random() * 9);
      var y = Math.round(Math.random() * 9);
      var changeDirection = Math.random() > 0.5;
      if (changeDirection) ship.changeDirection();
      var placed = computerBoard.placeShips(ship, x, y);
      if (!placed) placeSingle(ship);
    });
  }

  function start() {
    autoPlaceShips();
  }

  function renderShips() {
    (0,_displayController_renderController__WEBPACK_IMPORTED_MODULE_2__["default"])().renderFleet(playerFleet);
    (0,_displayController_drag__WEBPACK_IMPORTED_MODULE_5__["default"])(playerBoard, playerFleet).dragEventListeners();
  }

  function restartGame() {
    playerFleet = (0,_fleet__WEBPACK_IMPORTED_MODULE_1__.createShips)();
    cpuFleet = (0,_fleet__WEBPACK_IMPORTED_MODULE_1__.createShips)();
    playerBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_3__["default"]();
    computerBoard = new _gameboard__WEBPACK_IMPORTED_MODULE_3__["default"]();
    renderGameboards();
    renderShips();
    gridListener();
    (0,_displayController_domElements__WEBPACK_IMPORTED_MODULE_0__.restartDOMManipulation)();
  } // reset round button listener


  function resetEvent() {
    _displayController_domElements__WEBPACK_IMPORTED_MODULE_0__.domElements.resetButton.addEventListener("click", function () {
      (0,_displayController_domElements__WEBPACK_IMPORTED_MODULE_0__.chatBoxController)("reset");
      setTimeout(function () {
        restartGame();
      }, 3000);
    }, {
      once: true
    });
  }

  return {
    renderGameboards: renderGameboards,
    renderShips: renderShips,
    boardAttack: boardAttack,
    fleetChangeDirection: fleetChangeDirection,
    start: start,
    restartGame: restartGame,
    gridListener: gridListener,
    resetEvent: resetEvent
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);

/***/ }),

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _displayController_domElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./displayController/domElements */ "./src/modules/displayController/domElements.js");


function Gameboard() {
  var placedShips = [];
  var attackLog = []; // 10x10 board

  var board = new Array(10).fill(null).map(function () {
    return Array(10).fill(null);
  });

  var getBoard = function getBoard() {
    return board;
  };

  function checkPossiblePlacement(ship, x, y, board) {
    var num = 0; // disallowing placements outside the board return false

    if (x < 0 || x > 9 || y < 0 || y > 9) {
      return false;
    } // if ship doesn't fit inside the board return false


    if (ship.direction === "horizontal") {
      if (y + ship.length > 10) return false; //if any square along the ships path is not null end result is a false on possible replacement

      for (var i = 0; i < ship.length; i += 1) {
        if (board[x][y + i] != null) {
          num += 1;
        }
      }
    }

    if (ship.direction === "vertical") {
      if (x + ship.length > 10) return false;

      for (var _i = 0; _i < ship.length; _i += 1) {
        if (board[x + _i][y] != null) {
          num += 1;
        }
      }
    }

    if (num > 0) return false;
    return true;
  }

  function placeShips(ship, x, y) {
    // return false if we can't pass the check
    if (!checkPossiblePlacement(ship, x, y, board)) return false;

    if (ship.direction === "vertical") {
      for (var i = 0; i < ship.length; i += 1) {
        this.board[x + i][y] = ship;
      }
    }

    if (ship.direction === "horizontal") {
      for (var _i2 = 0; _i2 < ship.length; _i2 += 1) {
        this.board[x][y + _i2] = ship;
      }
    } // keeps track of the ships placed


    return this.placedShips.push(ship);
  }

  function recieveAttack(x, y, player) {
    if (board[x][y] != null) {
      attackLog.push({
        hit: {
          x: x,
          y: y
        }
      }); // board[x][y] is the ship, runs hit function on the ship

      this.board[x][y].hit();
      (0,_displayController_domElements__WEBPACK_IMPORTED_MODULE_0__.chatBoxController)(this.board[x][y], player);
      this.board[x][y] = "hit";
    }

    if (board[x][y] === null) {
      attackLog.push({
        miss: {
          x: x,
          y: y
        }
      });
      (0,_displayController_domElements__WEBPACK_IMPORTED_MODULE_0__.chatBoxController)(this.board[x][y], player);
      this.board[x][y] = "miss";
    }
  }

  function checkGameOver() {
    if (placedShips.every(function (ship) {
      return ship.isSunk();
    })) {
      return true;
    }

    return false;
  }

  return {
    board: board,
    placeShips: placeShips,
    placedShips: placedShips,
    recieveAttack: recieveAttack,
    attackLog: attackLog,
    checkGameOver: checkGameOver,
    getBoard: getBoard
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* eslint-disable no-unneeded-ternary */
function Player(type) {
  var player = type; // sets human turn to true and computers to false

  var turn = player === "human" ? true : false;

  function randomAttack(board) {
    var x = Math.round(Math.random() * 9);
    var y = Math.round(Math.random() * 9);

    if (board.board[x][y] === "miss" || board.board[x][y] === "hit") {
      randomAttack(board);
    } else board.recieveAttack(x, y);
  }

  function placeAttack(x, y, board) {
    if (player === "human") {
      board.recieveAttack(x, y, player);
    }

    if (player === "computer") {
      randomAttack();
    }
  }

  function switchTurn() {
    if (this.turn === true) {
      this.turn = false;
      return;
    }

    if (this.turn === false) {
      this.turn = true;
    }
  }

  return {
    randomAttack: randomAttack,
    placeAttack: placeAttack,
    player: player,
    switchTurn: switchTurn,
    turn: turn
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function Ship(shipName, size) {
  var name = shipName;
  var length = size;
  var isShipSunk = false;
  var direction = "vertical";
  var hits = new Array(length).fill(null);

  function hit() {
    hits.push("hit");
    hits.shift();

    if (hits.every(function (val) {
      return val === "hit";
    })) {
      this.isShipSunk = true;
    }
  }

  function isSunk() {
    if (this.isShipSunk === true) {
      return true;
    }

    return false;
  }

  function changeDirection() {
    if (this.direction === "vertical") {
      this.direction = "horizontal";
    } else if (this.direction === "horizontal") {
      this.direction = "vertical";
    }
  }

  return {
    name: name,
    length: length,
    hits: hits,
    hit: hit,
    isShipSunk: isShipSunk,
    isSunk: isSunk,
    direction: direction,
    changeDirection: changeDirection
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/board.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/board.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".main > .player-board {\r\n  background-color: rgba(24, 35, 44, 0.5);\r\n  display: grid;\r\n  grid-template: repeat(10, 1fr) / repeat(10, 1fr);\r\n  border: 3px solid white;\r\n  margin-right: 20px;\r\n  margin-left: -100px;\r\n}\r\n\r\n.main > .player-board.transform {\r\n  transform: scale(0.75);\r\n  animation: playerBoard 0.77s linear;\r\n  margin-right: 20px;\r\n  margin-left: -200px;\r\n}\r\n\r\n@keyframes playerBoard {\r\n  0% {\r\n    margin-right: 20px;\r\n    transform: scale(1);\r\n  }\r\n  50% {\r\n    margin-right: 20px;\r\n    transform: scale(0.75);\r\n  }\r\n  100% {\r\n    margin-right: 20px;\r\n    transform: scale(0.75);\r\n  }\r\n}\r\n\r\n.main > .computer-board {\r\n  background-color: rgba(24, 35, 44, 0.5);\r\n  grid-template: repeat(10, 1fr) / repeat(10, 1fr);\r\n  display: none;\r\n  border: 3px solid red;\r\n  cursor: none;\r\n}\r\n\r\n.main > .computer-board.active {\r\n  transition: all 600ms ease-out;\r\n  transform: scale(1);\r\n  display: grid;\r\n}\r\n\r\n/* blocks the click event when its not the players turn */\r\n.blocker:active {\r\n  pointer-events: none;\r\n}\r\n\r\n.grid-cell {\r\n  width: 3.1rem;\r\n  height: 3.1rem;\r\n  border: 1px solid black;\r\n}\r\n\r\n.hit {\r\n  background-color: rgb(214, 42, 42);\r\n  border: 1px solid red;\r\n}\r\n\r\n.miss {\r\n  background-color: rgb(46, 13, 235);\r\n  border: 1px solid rgb(0, 3, 160);\r\n}\r\n\r\n.crosshairX {\r\n  display: none;\r\n  position: fixed;\r\n  transform: translateX(-50%) translateY(-50%);\r\n  pointer-events: none;\r\n  width: 7%;\r\n  z-index: 1111;\r\n  transition: all 0ms ease-out;\r\n  border: 3px dashed rgb(90, 189, 60);\r\n}\r\n\r\n.crosshairX.active {\r\n  display: initial;\r\n}\r\n\r\n.crosshairY {\r\n  display: none;\r\n  position: fixed;\r\n  transform: translateX(-50%) translateY(-50%) rotate(90deg);\r\n  pointer-events: none;\r\n  width: 7%;\r\n  z-index: 1111;\r\n  transition: all 0ms ease-out;\r\n  border: 3px dashed rgb(90, 189, 60);\r\n}\r\n\r\n.crosshairY.active {\r\n  display: initial;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/styles/board.css"],"names":[],"mappings":"AAAA;EACE,uCAAuC;EACvC,aAAa;EACb,gDAAgD;EAChD,uBAAuB;EACvB,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,sBAAsB;EACtB,mCAAmC;EACnC,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE;IACE,kBAAkB;IAClB,mBAAmB;EACrB;EACA;IACE,kBAAkB;IAClB,sBAAsB;EACxB;EACA;IACE,kBAAkB;IAClB,sBAAsB;EACxB;AACF;;AAEA;EACE,uCAAuC;EACvC,gDAAgD;EAChD,aAAa;EACb,qBAAqB;EACrB,YAAY;AACd;;AAEA;EACE,8BAA8B;EAC9B,mBAAmB;EACnB,aAAa;AACf;;AAEA,yDAAyD;AACzD;EACE,oBAAoB;AACtB;;AAEA;EACE,aAAa;EACb,cAAc;EACd,uBAAuB;AACzB;;AAEA;EACE,kCAAkC;EAClC,qBAAqB;AACvB;;AAEA;EACE,kCAAkC;EAClC,gCAAgC;AAClC;;AAEA;EACE,aAAa;EACb,eAAe;EACf,4CAA4C;EAC5C,oBAAoB;EACpB,SAAS;EACT,aAAa;EACb,4BAA4B;EAC5B,mCAAmC;AACrC;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,eAAe;EACf,0DAA0D;EAC1D,oBAAoB;EACpB,SAAS;EACT,aAAa;EACb,4BAA4B;EAC5B,mCAAmC;AACrC;;AAEA;EACE,gBAAgB;AAClB","sourcesContent":[".main > .player-board {\r\n  background-color: rgba(24, 35, 44, 0.5);\r\n  display: grid;\r\n  grid-template: repeat(10, 1fr) / repeat(10, 1fr);\r\n  border: 3px solid white;\r\n  margin-right: 20px;\r\n  margin-left: -100px;\r\n}\r\n\r\n.main > .player-board.transform {\r\n  transform: scale(0.75);\r\n  animation: playerBoard 0.77s linear;\r\n  margin-right: 20px;\r\n  margin-left: -200px;\r\n}\r\n\r\n@keyframes playerBoard {\r\n  0% {\r\n    margin-right: 20px;\r\n    transform: scale(1);\r\n  }\r\n  50% {\r\n    margin-right: 20px;\r\n    transform: scale(0.75);\r\n  }\r\n  100% {\r\n    margin-right: 20px;\r\n    transform: scale(0.75);\r\n  }\r\n}\r\n\r\n.main > .computer-board {\r\n  background-color: rgba(24, 35, 44, 0.5);\r\n  grid-template: repeat(10, 1fr) / repeat(10, 1fr);\r\n  display: none;\r\n  border: 3px solid red;\r\n  cursor: none;\r\n}\r\n\r\n.main > .computer-board.active {\r\n  transition: all 600ms ease-out;\r\n  transform: scale(1);\r\n  display: grid;\r\n}\r\n\r\n/* blocks the click event when its not the players turn */\r\n.blocker:active {\r\n  pointer-events: none;\r\n}\r\n\r\n.grid-cell {\r\n  width: 3.1rem;\r\n  height: 3.1rem;\r\n  border: 1px solid black;\r\n}\r\n\r\n.hit {\r\n  background-color: rgb(214, 42, 42);\r\n  border: 1px solid red;\r\n}\r\n\r\n.miss {\r\n  background-color: rgb(46, 13, 235);\r\n  border: 1px solid rgb(0, 3, 160);\r\n}\r\n\r\n.crosshairX {\r\n  display: none;\r\n  position: fixed;\r\n  transform: translateX(-50%) translateY(-50%);\r\n  pointer-events: none;\r\n  width: 7%;\r\n  z-index: 1111;\r\n  transition: all 0ms ease-out;\r\n  border: 3px dashed rgb(90, 189, 60);\r\n}\r\n\r\n.crosshairX.active {\r\n  display: initial;\r\n}\r\n\r\n.crosshairY {\r\n  display: none;\r\n  position: fixed;\r\n  transform: translateX(-50%) translateY(-50%) rotate(90deg);\r\n  pointer-events: none;\r\n  width: 7%;\r\n  z-index: 1111;\r\n  transition: all 0ms ease-out;\r\n  border: 3px dashed rgb(90, 189, 60);\r\n}\r\n\r\n.crosshairY.active {\r\n  display: initial;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/main.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/main.css ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_board_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./board.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/board.css");
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ships_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! -!../../node_modules/css-loader/dist/cjs.js!./ships.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/ships.css");
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Anton&display=swap);"]);
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap);"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_board_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_ships_css__WEBPACK_IMPORTED_MODULE_3__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\r\n  padding: 0;\r\n  margin: 0;\r\n  box-sizing: border-box;\r\n}\r\n\r\nbody {\r\n  background-color: rgb(29, 85, 138);\r\n}\r\n\r\nheader {\r\n  padding-top: 40px;\r\n  text-align: center;\r\n  font-family: \"Alfa Slab One\", cursive;\r\n  font-size: 100px;\r\n  letter-spacing: 3px;\r\n  text-shadow: 1px 1px 0 #262626, 2px 2px 0 #262626, 3px 3px 0 #262626,\r\n    4px 4px 0 #262626, 5px 5px 0 #262626, 1px 1px 0 #262626,\r\n    6px 20px 20px rgba(0, 0, 0, 1), -1px -1px 0 rgb(141, 135, 135);\r\n  color: #f1f1f1;\r\n}\r\n\r\n.main {\r\n  margin-top: 50px;\r\n  display: flex;\r\n  flex-direction: row;\r\n  padding: 20px;\r\n  justify-content: center;\r\n}\r\n\r\n.setup-container {\r\n  color: white;\r\n  font-family: \"Press Start 2P\", cursive;\r\n  text-align: center;\r\n  font-size: 25px;\r\n  width: 400px;\r\n  white-space: nowrap;\r\n  margin-left: 20px;\r\n}\r\n\r\n.setup-container.remove {\r\n  display: none;\r\n}\r\n\r\n.setup-container > .rotate-ships {\r\n  font-size: 14px;\r\n  display: flex;\r\n  white-space: nowrap;\r\n  margin: 20px 20px 15px 90px;\r\n  padding: 10px;\r\n  font-family: \"Press Start 2P\", cursive;\r\n  border: 2px solid rgb(43, 46, 212);\r\n  background-color: rgb(26, 28, 98);\r\n  cursor: pointer;\r\n  color: white;\r\n}\r\n\r\n.rotate-ships:hover {\r\n  color: green;\r\n}\r\n\r\nfooter {\r\n  position: fixed;\r\n  bottom: 0;\r\n  height: 7.5%;\r\n  width: 100%;\r\n  text-align: center;\r\n  border: 1px solid black;\r\n  background-color: rgb(6, 41, 75);\r\n  font-weight: bolder;\r\n  font-size: 22px;\r\n  color: white;\r\n  padding-top: 14px;\r\n}\r\n\r\nfooter > a > img {\r\n  margin-left: 5px;\r\n\r\n  /* changes image color white */\r\n  filter: invert(100%) sepia(0%) saturate(5128%) hue-rotate(84deg)\r\n    brightness(106%) contrast(140%);\r\n}\r\n\r\nfooter > a > img:hover {\r\n  filter: invert(48%) sepia(13%) saturate(3207%) hue-rotate(130deg)\r\n    brightness(95%) contrast(80%);\r\n}\r\n\r\n.start-button-container {\r\n  display: none;\r\n}\r\n\r\n.start-button-container.active {\r\n  display: block;\r\n  width: 400px;\r\n  height: 400px;\r\n  margin-left: 20px;\r\n  justify-content: center;\r\n}\r\n\r\n.start-button {\r\n  position: absolute;\r\n  margin-left: 120px;\r\n  padding: 15px 25px 15px 25px;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  font-size: 20px;\r\n  white-space: nowrap;\r\n  font-family: \"Press Start 2P\", cursive;\r\n  border: 2px solid rgb(43, 46, 212);\r\n  background-color: rgb(26, 28, 98);\r\n  cursor: pointer;\r\n  color: white;\r\n}\r\n\r\n.start-button:hover {\r\n  color: green;\r\n}\r\n\r\n.modal-container {\r\n  display: none;\r\n  position: fixed;\r\n  top: 0;\r\n  right: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  z-index: 10;\r\n  background-color: rgba(0, 0, 0, 0.4);\r\n}\r\n\r\n.modal-container.active {\r\n  display: initial;\r\n  position: fixed;\r\n  top: 0;\r\n  right: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  z-index: 10;\r\n  background-color: rgba(0, 0, 0, 0.4);\r\n}\r\n\r\n.modal {\r\n  margin: 9% auto;\r\n  padding-top: 150px;\r\n  border: 1px solid #888;\r\n  width: 100%;\r\n  height: 67%;\r\n  text-align: center;\r\n  font-size: 100px;\r\n  font-family: \"Press Start 2P\", cursive;\r\n  border: 2px solid rgb(43, 46, 212);\r\n  background-color: rgb(26, 28, 98);\r\n  color: white;\r\n}\r\n\r\n.modal > .play-again {\r\n  position: fixed;\r\n  padding: 20px;\r\n  top: 60%;\r\n  right: 43%;\r\n  color: rgb(0, 0, 0);\r\n  font-size: 28px;\r\n  font-weight: bold;\r\n  cursor: pointer;\r\n  font-family: \"Press Start 2P\", cursive;\r\n  border: 2px solid rgb(43, 46, 212);\r\n  background-color: rgb(26, 28, 98);\r\n  color: white;\r\n}\r\n\r\n.modal > .play-again:hover {\r\n  color: green;\r\n}\r\n\r\n.main > .chat-container {\r\n  display: none;\r\n}\r\n\r\n.main > .chat-container.active {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n  margin-right: -200px;\r\n  margin-left: 100px;\r\n  width: min-content;\r\n  height: min-content;\r\n  border: 4px solid black;\r\n  outline: 6px solid green;\r\n  background: rgb(31, 30, 30);\r\n}\r\n\r\n@keyframes miss {\r\n  0% {\r\n    background: rgb(31, 30, 30);\r\n  }\r\n  22% {\r\n    background: rgb(0, 225, 255);\r\n  }\r\n  77% {\r\n    background: rgb(8, 47, 173);\r\n  }\r\n  100% {\r\n    background: rgb(31, 30, 30);\r\n  }\r\n}\r\n\r\n@keyframes hit {\r\n  0% {\r\n    background: rgb(31, 30, 30);\r\n  }\r\n  4% {\r\n    background: red;\r\n  }\r\n  100% {\r\n    background: rgb(31, 30, 30);\r\n  }\r\n}\r\n\r\n@keyframes sunk {\r\n  0% {\r\n    background: rgb(31, 30, 30);\r\n  }\r\n  4% {\r\n    background: rgb(255, 255, 255);\r\n  }\r\n  100% {\r\n    background: rgb(255, 255, 255);\r\n  }\r\n}\r\n\r\n.main > .chat-container > img {\r\n  position: relative;\r\n  height: 60%;\r\n  width: 70%;\r\n  margin-left: 40px;\r\n}\r\n\r\n.chat-container > .chat-box {\r\n  position: relative;\r\n  font-family: sans-serif;\r\n  font-size: 16px;\r\n  line-height: 24px;\r\n  width: 360px;\r\n  height: 100px;\r\n  background: black;\r\n  padding: 24px;\r\n  text-align: center;\r\n  color: rgb(19, 243, 75);\r\n  border: 3px solid white;\r\n  border-radius: 5px;\r\n  font-family: \"Press Start 2P\", cursive;\r\n}\r\n\r\n.chat-box > .chat-text {\r\n  overflow: hidden;\r\n  white-space: nowrap;\r\n  margin: 0 auto;\r\n  animation: printing 1s steps(40, end);\r\n}\r\n\r\n@keyframes printing {\r\n  from {\r\n    width: 0;\r\n  }\r\n  to {\r\n    width: 100%;\r\n  }\r\n}\r\n\r\n.chat-container > .reset-button {\r\n  opacity: 0.77;\r\n  font-weight: bolder;\r\n  height: 25px;\r\n  cursor: pointer;\r\n  letter-spacing: 2.2px;\r\n  margin-top: 2px;\r\n  box-shadow: 0px 0px 5px 2px;\r\n}\r\n\r\n.reset-button:hover,\r\n.reset-button:focus {\r\n  opacity: 1;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/styles/main.css"],"names":[],"mappings":"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","sourcesContent":["@import url(\"https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Anton&display=swap\");\r\n@import url(\"https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap\");\r\n@import \"./board.css\";\r\n@import \"./ships.css\";\r\n\r\n* {\r\n  padding: 0;\r\n  margin: 0;\r\n  box-sizing: border-box;\r\n}\r\n\r\nbody {\r\n  background-color: rgb(29, 85, 138);\r\n}\r\n\r\nheader {\r\n  padding-top: 40px;\r\n  text-align: center;\r\n  font-family: \"Alfa Slab One\", cursive;\r\n  font-size: 100px;\r\n  letter-spacing: 3px;\r\n  text-shadow: 1px 1px 0 #262626, 2px 2px 0 #262626, 3px 3px 0 #262626,\r\n    4px 4px 0 #262626, 5px 5px 0 #262626, 1px 1px 0 #262626,\r\n    6px 20px 20px rgba(0, 0, 0, 1), -1px -1px 0 rgb(141, 135, 135);\r\n  color: #f1f1f1;\r\n}\r\n\r\n.main {\r\n  margin-top: 50px;\r\n  display: flex;\r\n  flex-direction: row;\r\n  padding: 20px;\r\n  justify-content: center;\r\n}\r\n\r\n.setup-container {\r\n  color: white;\r\n  font-family: \"Press Start 2P\", cursive;\r\n  text-align: center;\r\n  font-size: 25px;\r\n  width: 400px;\r\n  white-space: nowrap;\r\n  margin-left: 20px;\r\n}\r\n\r\n.setup-container.remove {\r\n  display: none;\r\n}\r\n\r\n.setup-container > .rotate-ships {\r\n  font-size: 14px;\r\n  display: flex;\r\n  white-space: nowrap;\r\n  margin: 20px 20px 15px 90px;\r\n  padding: 10px;\r\n  font-family: \"Press Start 2P\", cursive;\r\n  border: 2px solid rgb(43, 46, 212);\r\n  background-color: rgb(26, 28, 98);\r\n  cursor: pointer;\r\n  color: white;\r\n}\r\n\r\n.rotate-ships:hover {\r\n  color: green;\r\n}\r\n\r\nfooter {\r\n  position: fixed;\r\n  bottom: 0;\r\n  height: 7.5%;\r\n  width: 100%;\r\n  text-align: center;\r\n  border: 1px solid black;\r\n  background-color: rgb(6, 41, 75);\r\n  font-weight: bolder;\r\n  font-size: 22px;\r\n  color: white;\r\n  padding-top: 14px;\r\n}\r\n\r\nfooter > a > img {\r\n  margin-left: 5px;\r\n\r\n  /* changes image color white */\r\n  filter: invert(100%) sepia(0%) saturate(5128%) hue-rotate(84deg)\r\n    brightness(106%) contrast(140%);\r\n}\r\n\r\nfooter > a > img:hover {\r\n  filter: invert(48%) sepia(13%) saturate(3207%) hue-rotate(130deg)\r\n    brightness(95%) contrast(80%);\r\n}\r\n\r\n.start-button-container {\r\n  display: none;\r\n}\r\n\r\n.start-button-container.active {\r\n  display: block;\r\n  width: 400px;\r\n  height: 400px;\r\n  margin-left: 20px;\r\n  justify-content: center;\r\n}\r\n\r\n.start-button {\r\n  position: absolute;\r\n  margin-left: 120px;\r\n  padding: 15px 25px 15px 25px;\r\n  top: 50%;\r\n  transform: translateY(-50%);\r\n  font-size: 20px;\r\n  white-space: nowrap;\r\n  font-family: \"Press Start 2P\", cursive;\r\n  border: 2px solid rgb(43, 46, 212);\r\n  background-color: rgb(26, 28, 98);\r\n  cursor: pointer;\r\n  color: white;\r\n}\r\n\r\n.start-button:hover {\r\n  color: green;\r\n}\r\n\r\n.modal-container {\r\n  display: none;\r\n  position: fixed;\r\n  top: 0;\r\n  right: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  z-index: 10;\r\n  background-color: rgba(0, 0, 0, 0.4);\r\n}\r\n\r\n.modal-container.active {\r\n  display: initial;\r\n  position: fixed;\r\n  top: 0;\r\n  right: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n  z-index: 10;\r\n  background-color: rgba(0, 0, 0, 0.4);\r\n}\r\n\r\n.modal {\r\n  margin: 9% auto;\r\n  padding-top: 150px;\r\n  border: 1px solid #888;\r\n  width: 100%;\r\n  height: 67%;\r\n  text-align: center;\r\n  font-size: 100px;\r\n  font-family: \"Press Start 2P\", cursive;\r\n  border: 2px solid rgb(43, 46, 212);\r\n  background-color: rgb(26, 28, 98);\r\n  color: white;\r\n}\r\n\r\n.modal > .play-again {\r\n  position: fixed;\r\n  padding: 20px;\r\n  top: 60%;\r\n  right: 43%;\r\n  color: rgb(0, 0, 0);\r\n  font-size: 28px;\r\n  font-weight: bold;\r\n  cursor: pointer;\r\n  font-family: \"Press Start 2P\", cursive;\r\n  border: 2px solid rgb(43, 46, 212);\r\n  background-color: rgb(26, 28, 98);\r\n  color: white;\r\n}\r\n\r\n.modal > .play-again:hover {\r\n  color: green;\r\n}\r\n\r\n.main > .chat-container {\r\n  display: none;\r\n}\r\n\r\n.main > .chat-container.active {\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: center;\r\n  margin-right: -200px;\r\n  margin-left: 100px;\r\n  width: min-content;\r\n  height: min-content;\r\n  border: 4px solid black;\r\n  outline: 6px solid green;\r\n  background: rgb(31, 30, 30);\r\n}\r\n\r\n@keyframes miss {\r\n  0% {\r\n    background: rgb(31, 30, 30);\r\n  }\r\n  22% {\r\n    background: rgb(0, 225, 255);\r\n  }\r\n  77% {\r\n    background: rgb(8, 47, 173);\r\n  }\r\n  100% {\r\n    background: rgb(31, 30, 30);\r\n  }\r\n}\r\n\r\n@keyframes hit {\r\n  0% {\r\n    background: rgb(31, 30, 30);\r\n  }\r\n  4% {\r\n    background: red;\r\n  }\r\n  100% {\r\n    background: rgb(31, 30, 30);\r\n  }\r\n}\r\n\r\n@keyframes sunk {\r\n  0% {\r\n    background: rgb(31, 30, 30);\r\n  }\r\n  4% {\r\n    background: rgb(255, 255, 255);\r\n  }\r\n  100% {\r\n    background: rgb(255, 255, 255);\r\n  }\r\n}\r\n\r\n.main > .chat-container > img {\r\n  position: relative;\r\n  height: 60%;\r\n  width: 70%;\r\n  margin-left: 40px;\r\n}\r\n\r\n.chat-container > .chat-box {\r\n  position: relative;\r\n  font-family: sans-serif;\r\n  font-size: 16px;\r\n  line-height: 24px;\r\n  width: 360px;\r\n  height: 100px;\r\n  background: black;\r\n  padding: 24px;\r\n  text-align: center;\r\n  color: rgb(19, 243, 75);\r\n  border: 3px solid white;\r\n  border-radius: 5px;\r\n  font-family: \"Press Start 2P\", cursive;\r\n}\r\n\r\n.chat-box > .chat-text {\r\n  overflow: hidden;\r\n  white-space: nowrap;\r\n  margin: 0 auto;\r\n  animation: printing 1s steps(40, end);\r\n}\r\n\r\n@keyframes printing {\r\n  from {\r\n    width: 0;\r\n  }\r\n  to {\r\n    width: 100%;\r\n  }\r\n}\r\n\r\n.chat-container > .reset-button {\r\n  opacity: 0.77;\r\n  font-weight: bolder;\r\n  height: 25px;\r\n  cursor: pointer;\r\n  letter-spacing: 2.2px;\r\n  margin-top: 2px;\r\n  box-shadow: 0px 0px 5px 2px;\r\n}\r\n\r\n.reset-button:hover,\r\n.reset-button:focus {\r\n  opacity: 1;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/ships.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/ships.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".ship-setup-container {\r\n  position: fixed;\r\n  display: flex;\r\n  margin: 20px 0px 0px 35px;\r\n}\r\n\r\n.ship {\r\n  padding: 6px;\r\n}\r\n\r\n.horizontal {\r\n  display: flex;\r\n}\r\n\r\n.ship-setup-container.horizontal {\r\n  display: block;\r\n  justify-content: space-evenly;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.Carrier-container {\r\n  width: min-content;\r\n  height: min-content;\r\n}\r\n\r\n.Carrier-container > .ship-cell {\r\n  width: 3.1rem;\r\n  height: 3.1rem;\r\n  border: 2px solid rgb(43, 46, 212);\r\n  background-color: rgb(26, 28, 98);\r\n}\r\n\r\n.Battleship-container {\r\n  width: min-content;\r\n  height: min-content;\r\n}\r\n\r\n.Battleship-container > .ship-cell {\r\n  width: 3.1rem;\r\n  height: 3.1rem;\r\n  border: 2px solid rgb(43, 46, 212);\r\n  background-color: rgb(26, 28, 98);\r\n}\r\n\r\n.Cruiser-container {\r\n  width: min-content;\r\n  height: min-content;\r\n}\r\n\r\n.Cruiser-container > .ship-cell {\r\n  width: 3.1rem;\r\n  height: 3.1rem;\r\n  border: 2px solid rgb(43, 46, 212);\r\n  background-color: rgb(26, 28, 98);\r\n}\r\n\r\n.Submarine-container {\r\n  width: min-content;\r\n  height: min-content;\r\n}\r\n\r\n.Submarine-container > .ship-cell {\r\n  width: 3.1rem;\r\n  height: 3.1rem;\r\n  border: 2px solid rgb(43, 46, 212);\r\n  background-color: rgb(26, 28, 98);\r\n}\r\n\r\n.Destroyer-container {\r\n  width: min-content;\r\n  height: min-content;\r\n}\r\n\r\n.Destroyer-container > .ship-cell {\r\n  width: 3.1rem;\r\n  height: 3.1rem;\r\n  border: 2px solid rgb(43, 46, 212);\r\n  background-color: rgb(26, 28, 98);\r\n}\r\n\r\n/* classes added to the grid cells where ships have been placed */\r\n.Carrier {\r\n  border: 2px solid rgb(43, 46, 212);\r\n  background-color: rgb(26, 28, 98);\r\n}\r\n\r\n.Battleship {\r\n  border: 2px solid rgb(43, 46, 212);\r\n  background-color: rgb(26, 28, 98);\r\n}\r\n\r\n.Cruiser {\r\n  border: 2px solid rgb(43, 46, 212);\r\n  background-color: rgb(26, 28, 98);\r\n}\r\n\r\n.Submarine {\r\n  border: 2px solid rgb(43, 46, 212);\r\n  background-color: rgb(26, 28, 98);\r\n}\r\n\r\n.Destroyer {\r\n  border: 2px solid rgb(43, 46, 212);\r\n  background-color: rgb(26, 28, 98);\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/styles/ships.css"],"names":[],"mappings":"AAAA;EACE,eAAe;EACf,aAAa;EACb,yBAAyB;AAC3B;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,cAAc;EACd,6BAA6B;EAC7B,eAAe;AACjB;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,cAAc;EACd,kCAAkC;EAClC,iCAAiC;AACnC;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,cAAc;EACd,kCAAkC;EAClC,iCAAiC;AACnC;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,cAAc;EACd,kCAAkC;EAClC,iCAAiC;AACnC;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,cAAc;EACd,kCAAkC;EAClC,iCAAiC;AACnC;;AAEA;EACE,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,cAAc;EACd,kCAAkC;EAClC,iCAAiC;AACnC;;AAEA,iEAAiE;AACjE;EACE,kCAAkC;EAClC,iCAAiC;AACnC;;AAEA;EACE,kCAAkC;EAClC,iCAAiC;AACnC;;AAEA;EACE,kCAAkC;EAClC,iCAAiC;AACnC;;AAEA;EACE,kCAAkC;EAClC,iCAAiC;AACnC;;AAEA;EACE,kCAAkC;EAClC,iCAAiC;AACnC","sourcesContent":[".ship-setup-container {\r\n  position: fixed;\r\n  display: flex;\r\n  margin: 20px 0px 0px 35px;\r\n}\r\n\r\n.ship {\r\n  padding: 6px;\r\n}\r\n\r\n.horizontal {\r\n  display: flex;\r\n}\r\n\r\n.ship-setup-container.horizontal {\r\n  display: block;\r\n  justify-content: space-evenly;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.Carrier-container {\r\n  width: min-content;\r\n  height: min-content;\r\n}\r\n\r\n.Carrier-container > .ship-cell {\r\n  width: 3.1rem;\r\n  height: 3.1rem;\r\n  border: 2px solid rgb(43, 46, 212);\r\n  background-color: rgb(26, 28, 98);\r\n}\r\n\r\n.Battleship-container {\r\n  width: min-content;\r\n  height: min-content;\r\n}\r\n\r\n.Battleship-container > .ship-cell {\r\n  width: 3.1rem;\r\n  height: 3.1rem;\r\n  border: 2px solid rgb(43, 46, 212);\r\n  background-color: rgb(26, 28, 98);\r\n}\r\n\r\n.Cruiser-container {\r\n  width: min-content;\r\n  height: min-content;\r\n}\r\n\r\n.Cruiser-container > .ship-cell {\r\n  width: 3.1rem;\r\n  height: 3.1rem;\r\n  border: 2px solid rgb(43, 46, 212);\r\n  background-color: rgb(26, 28, 98);\r\n}\r\n\r\n.Submarine-container {\r\n  width: min-content;\r\n  height: min-content;\r\n}\r\n\r\n.Submarine-container > .ship-cell {\r\n  width: 3.1rem;\r\n  height: 3.1rem;\r\n  border: 2px solid rgb(43, 46, 212);\r\n  background-color: rgb(26, 28, 98);\r\n}\r\n\r\n.Destroyer-container {\r\n  width: min-content;\r\n  height: min-content;\r\n}\r\n\r\n.Destroyer-container > .ship-cell {\r\n  width: 3.1rem;\r\n  height: 3.1rem;\r\n  border: 2px solid rgb(43, 46, 212);\r\n  background-color: rgb(26, 28, 98);\r\n}\r\n\r\n/* classes added to the grid cells where ships have been placed */\r\n.Carrier {\r\n  border: 2px solid rgb(43, 46, 212);\r\n  background-color: rgb(26, 28, 98);\r\n}\r\n\r\n.Battleship {\r\n  border: 2px solid rgb(43, 46, 212);\r\n  background-color: rgb(26, 28, 98);\r\n}\r\n\r\n.Cruiser {\r\n  border: 2px solid rgb(43, 46, 212);\r\n  background-color: rgb(26, 28, 98);\r\n}\r\n\r\n.Submarine {\r\n  border: 2px solid rgb(43, 46, 212);\r\n  background-color: rgb(26, 28, 98);\r\n}\r\n\r\n.Destroyer {\r\n  border: 2px solid rgb(43, 46, 212);\r\n  background-color: rgb(26, 28, 98);\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var _i = 0; _i < this.length; _i++) {
        var id = this[_i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i2 = 0; _i2 < modules.length; _i2++) {
      var item = [].concat(modules[_i2]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/main.css":
/*!*****************************!*\
  !*** ./src/styles/main.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./main.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/main.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_displayController_domElements__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/displayController/domElements */ "./src/modules/displayController/domElements.js");
/* harmony import */ var _modules_gameLoop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/gameLoop */ "./src/modules/gameLoop.js");
/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/main.css */ "./src/styles/main.css");



var game = (0,_modules_gameLoop__WEBPACK_IMPORTED_MODULE_1__["default"])();
game.renderGameboards();
game.renderShips();
game.gridListener(); //rotate button event listener

_modules_displayController_domElements__WEBPACK_IMPORTED_MODULE_0__.domElements.rotateButton.addEventListener("click", function () {
  (0,_modules_displayController_domElements__WEBPACK_IMPORTED_MODULE_0__.toggleHorizontalClass)();
  game.fleetChangeDirection();
}); // start button listener

document.querySelector(".start-button").addEventListener("click", function () {
  game.resetEvent();
  game.start();
  (0,_modules_displayController_domElements__WEBPACK_IMPORTED_MODULE_0__.startDOMManipulation)();
}); // replay button listener

_modules_displayController_domElements__WEBPACK_IMPORTED_MODULE_0__.domElements.playAgain.addEventListener("click", function () {
  game.restartGame();
  game.resetEvent();
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2Rpc3BsYXlDb250cm9sbGVyL2RvbUVsZW1lbnRzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9kaXNwbGF5Q29udHJvbGxlci9kcmFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9kaXNwbGF5Q29udHJvbGxlci9yZW5kZXJDb250cm9sbGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9mbGVldC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvZ2FtZUxvb3AuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL21vZHVsZXMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL2JvYXJkLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9tYWluLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9zaGlwcy5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGVzL21haW4uY3NzP2U4MGEiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0XHJcbmV4cG9ydCBjb25zdCBkb21FbGVtZW50cyA9IHtcclxuICBwbGF5ZXJHYW1lYm9hcmQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyLWJvYXJkXCIpLFxyXG4gIGNvbXB1dGVyR2FtZWJvYXJkOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXB1dGVyLWJvYXJkXCIpLFxyXG4gIHNldHVwQ29udGFpbmVyOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNldHVwLWNvbnRhaW5lclwiKSxcclxuICBzaGlwU2V0dXBDb250YWluZXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2hpcC1zZXR1cC1jb250YWluZXJcIiksXHJcbiAgcm90YXRlQnV0dG9uOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJvdGF0ZS1zaGlwc1wiKSxcclxuICBzaGlwQ2VsbDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaGlwLWNlbGxcIiksXHJcbiAgc3RhcnRCdXR0b246IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhcnQtYnV0dG9uXCIpLFxyXG4gIHN0YXJ0QnV0dG9uQ29udGFpbmVyOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0LWJ1dHRvbi1jb250YWluZXJcIiksXHJcbiAgbW9kYWxDb250YWluZXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWwtY29udGFpbmVyXCIpLFxyXG4gIG1vZGFsOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsXCIpLFxyXG4gIHBsYXlBZ2FpbjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5LWFnYWluXCIpLFxyXG4gIHdpbm5lcjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kaXNwbGF5LXdpbm5lclwiKSxcclxuICBjcm9zc2hhaXJYOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNyb3NzaGFpclhcIiksXHJcbiAgY3Jvc3NoYWlyWTogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jcm9zc2hhaXJZXCIpLFxyXG4gIGNoYXRDb250YWluZXI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2hhdC1jb250YWluZXJcIiksXHJcbiAgY2hhdEJveDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaGF0LWJveFwiKSxcclxuICBjaGF0VGV4dDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaGF0LXRleHRcIiksXHJcbiAgcmVzZXRCdXR0b246IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzZXQtYnV0dG9uXCIpLFxyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0RE9NTWFuaXB1bGF0aW9uKCkge1xyXG4gIGRvbUVsZW1lbnRzLnNldHVwQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJyZW1vdmVcIik7XHJcbiAgZG9tRWxlbWVudHMuY29tcHV0ZXJHYW1lYm9hcmQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICBkb21FbGVtZW50cy5zdGFydEJ1dHRvbkNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIGRvbUVsZW1lbnRzLnNoaXBTZXR1cENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwiaG9yaXpvbnRhbFwiKTtcclxuICBkb21FbGVtZW50cy5wbGF5ZXJHYW1lYm9hcmQuY2xhc3NMaXN0LnRvZ2dsZShcInRyYW5zZm9ybVwiKTtcclxuICBkb21FbGVtZW50cy5jcm9zc2hhaXJYLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgZG9tRWxlbWVudHMuY3Jvc3NoYWlyWS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIGRvbUVsZW1lbnRzLmNoYXRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICBkb21FbGVtZW50cy5jaGF0VGV4dC50ZXh0Q29udGVudCA9IFwiR2V0IHJlYWR5IGFuZCBmaXJlIVwiO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gcmVzdGFydERPTU1hbmlwdWxhdGlvbigpIHtcclxuICBkb21FbGVtZW50cy5tb2RhbENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIGRvbUVsZW1lbnRzLnBsYXllckdhbWVib2FyZC5jbGFzc0xpc3QudG9nZ2xlKFwidHJhbnNmb3JtXCIpO1xyXG4gIGRvbUVsZW1lbnRzLnNldHVwQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJyZW1vdmVcIik7XHJcbiAgZG9tRWxlbWVudHMuY29tcHV0ZXJHYW1lYm9hcmQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICBkb21FbGVtZW50cy5jcm9zc2hhaXJYLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgZG9tRWxlbWVudHMuY3Jvc3NoYWlyWS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIGRvbUVsZW1lbnRzLmNoYXRDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUhvcml6b250YWxDbGFzcygpIHtcclxuICBkb21FbGVtZW50cy5zaGlwU2V0dXBDb250YWluZXIuY2hpbGROb2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XHJcbiAgICBub2RlLmNsYXNzTGlzdC50b2dnbGUoXCJob3Jpem9udGFsXCIpO1xyXG4gIH0pO1xyXG4gIGRvY3VtZW50XHJcbiAgICAucXVlcnlTZWxlY3RvcihcIi5zaGlwLXNldHVwLWNvbnRhaW5lclwiKVxyXG4gICAgLmNsYXNzTGlzdC50b2dnbGUoXCJob3Jpem9udGFsXCIpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZXNldEFuaW1hdGlvbigpIHtcclxuICBjb25zdCB0ZXh0ID0gZG9tRWxlbWVudHMuY2hhdFRleHQ7XHJcbiAgY29uc3QgY29udGFpbmVyID0gZG9tRWxlbWVudHMuY2hhdENvbnRhaW5lcjtcclxuICB0ZXh0LnN0eWxlLmFuaW1hdGlvbiA9IFwibm9uZVwiO1xyXG4gIHRleHQub2Zmc2V0SGVpZ2h0O1xyXG4gIHRleHQuc3R5bGUuYW5pbWF0aW9uID0gbnVsbDtcclxuICBjb250YWluZXIuc3R5bGUuYW5pbWF0aW9uID0gXCJub25lXCI7XHJcbiAgY29udGFpbmVyLm9mZnNldEhlaWdodDtcclxuICBjb250YWluZXIuc3R5bGUuYW5pbWF0aW9uID0gbnVsbDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNoYXRCb3hDb250cm9sbGVyKGxvY2F0aW9uLCBwbGF5ZXIpIHtcclxuICByZXNldEFuaW1hdGlvbigpO1xyXG4gIGNvbnN0IHRleHQgPSBkb21FbGVtZW50cy5jaGF0VGV4dDtcclxuICBjb25zdCBjb250YWluZXIgPSBkb21FbGVtZW50cy5jaGF0Q29udGFpbmVyO1xyXG5cclxuICBmdW5jdGlvbiBwbGF5ZXJIaXRzKCkge1xyXG4gICAgdGV4dC50ZXh0Q29udGVudCA9IFwiWW91IGhpdCBhIHNoaXAhXCI7XHJcbiAgICB0ZXh0LnN0eWxlLmFuaW1hdGlvbiA9IFwicHJpbnRpbmcgMXMgc3RlcHMoNDAsIGVuZClcIjtcclxuICAgIGNvbnRhaW5lci5zdHlsZS5hbmltYXRpb24gPSBcImhpdCAxcyBsaW5lYXJcIjtcclxuICB9XHJcbiAgZnVuY3Rpb24gcGxheWVyTWlzc2VkKCkge1xyXG4gICAgdGV4dC50ZXh0Q29udGVudCA9IFwiWW91IG1pc3NlZC5cIjtcclxuICAgIHRleHQuc3R5bGUuYW5pbWF0aW9uID0gXCJwcmludGluZyAxcyBzdGVwcyg0MCwgZW5kKVwiO1xyXG4gICAgY29udGFpbmVyLnN0eWxlLmFuaW1hdGlvbiA9IFwibWlzcyAxcyBsaW5lYXJcIjtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNvbXB1dGVyU2hpcFN1bmsoKSB7XHJcbiAgICB0ZXh0LnRleHRDb250ZW50ID0gXCJZb3UgU3VuayBhIFNoaXAhXCI7XHJcbiAgICB0ZXh0LnN0eWxlLmFuaW1hdGlvbiA9IFwicHJpbnRpbmcgMXMgc3RlcHMoNDAsIGVuZClcIjtcclxuICAgIGNvbnRhaW5lci5zdHlsZS5hbmltYXRpb24gPSBcInN1bmsgMnMgbGluZWFyXCI7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBjb21wdXRlckhpdHMoKSB7XHJcbiAgICB0ZXh0LnRleHRDb250ZW50ID0gXCJZb3Ugd2VyZSBIaXQhXCI7XHJcbiAgICB0ZXh0LnN0eWxlLmFuaW1hdGlvbiA9IFwicHJpbnRpbmcgMXMgc3RlcHMoNDAsIGVuZClcIjtcclxuICAgIGNvbnRhaW5lci5zdHlsZS5hbmltYXRpb24gPSBcImhpdCAxcyBsaW5lYXJcIjtcclxuICB9XHJcbiAgZnVuY3Rpb24gY29tcHV0ZXJNaXNzZWQoKSB7XHJcbiAgICB0ZXh0LnRleHRDb250ZW50ID0gXCJUaGV5IG1pc3NlZC5cIjtcclxuICAgIHRleHQuc3R5bGUuYW5pbWF0aW9uID0gXCJwcmludGluZyAxcyBzdGVwcyg0MCwgZW5kKVwiO1xyXG4gICAgY29udGFpbmVyLnN0eWxlLmFuaW1hdGlvbiA9IFwibWlzcyAxcyBsaW5lYXJcIjtcclxuICB9XHJcbiAgZnVuY3Rpb24gcGxheWVyU2hpcFN1bmsoKSB7XHJcbiAgICB0ZXh0LnRleHRDb250ZW50ID0gXCJUaGV5IHN1bmsgYSBTaGlwIVwiO1xyXG4gICAgdGV4dC5zdHlsZS5hbmltYXRpb24gPSBcInN1bmsgMXMgc3RlcHMoNDAsIGVuZClcIjtcclxuICAgIGNvbnRhaW5lci5zdHlsZS5hbmltYXRpb24gPSBcInN1bmsgMnMgbGluZWFyXCI7XHJcbiAgfVxyXG5cclxuICBpZiAobG9jYXRpb24gPT09IFwicmVzZXRcIikge1xyXG4gICAgdGV4dC50ZXh0Q29udGVudCA9IFwiR2V0IGJhY2sgaGVyZSFcIjtcclxuICAgIHRleHQuc3R5bGUuYW5pbWF0aW9uID0gXCJwcmludGluZyAxcyBzdGVwcyg0MCwgZW5kKVwiO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgaWYgKGxvY2F0aW9uID09PSBudWxsKSB7XHJcbiAgICBpZiAocGxheWVyID09PSBcImh1bWFuXCIpIHBsYXllck1pc3NlZCgpO1xyXG4gICAgZWxzZSBjb21wdXRlck1pc3NlZCgpO1xyXG4gIH1cclxuICBpZiAobG9jYXRpb24gIT09IG51bGwpIHtcclxuICAgIGlmIChwbGF5ZXIgPT09IFwiaHVtYW5cIikge1xyXG4gICAgICBpZiAobG9jYXRpb24uaXNTaGlwU3VuayA9PT0gdHJ1ZSkgY29tcHV0ZXJTaGlwU3VuaygpO1xyXG4gICAgICBlbHNlIHBsYXllckhpdHMoKTtcclxuICAgIH0gZWxzZSBpZiAobG9jYXRpb24uaXNTaGlwU3VuayA9PT0gdHJ1ZSkgcGxheWVyU2hpcFN1bmsoKTtcclxuICAgIGVsc2UgY29tcHV0ZXJIaXRzKCk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyB0b2dnbGVzIGNsaWNrIGV2ZW50IGJsb2NrZXIgZXZlcnkgdHVyblxyXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlQ2xpY2tCbG9ja2VyKCkge1xyXG4gIGRvbUVsZW1lbnRzLmNvbXB1dGVyR2FtZWJvYXJkLmNsYXNzTGlzdC50b2dnbGUoXCJibG9ja2VyXCIpO1xyXG59XHJcbiIsImltcG9ydCB7IG1hdGNoU2hpcCB9IGZyb20gXCIuLi9mbGVldFwiO1xyXG5cclxuaW1wb3J0IHsgZG9tRWxlbWVudHMgfSBmcm9tIFwiLi9kb21FbGVtZW50c1wiO1xyXG5pbXBvcnQgcmVuZGVyQ29udHJvbGxlciBmcm9tIFwiLi9yZW5kZXJDb250cm9sbGVyXCI7XHJcblxyXG5mdW5jdGlvbiBEcmFnKHBsYXllckJvYXJkLCBwbGF5ZXJGbGVldCkge1xyXG4gIGZ1bmN0aW9uIGRyYWdFdmVudExpc3RlbmVycygpIHtcclxuICAgIGNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zaGlwXCIpO1xyXG4gICAgY29uc3QgY2VsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbFwiKTtcclxuICAgIGNvbnN0IHsgY3Jvc3NoYWlyWCB9ID0gZG9tRWxlbWVudHM7XHJcbiAgICBjb25zdCB7IGNyb3NzaGFpclkgfSA9IGRvbUVsZW1lbnRzO1xyXG5cclxuICAgIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHNoaXAuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCBkcmFnU3RhcnQpKTtcclxuICAgIGNlbGxzLmZvckVhY2goKGNlbGwpID0+IGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdvdmVyXCIsIGRyYWdPdmVyKSk7XHJcbiAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW50ZXJcIiwgZHJhZ0VudGVyKSk7XHJcbiAgICBjZWxscy5mb3JFYWNoKChjZWxsKSA9PiBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIGRyYWdEcm9wKSk7XHJcblxyXG4gICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4gc2hpcC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ1wiLCBkcmFnKSk7XHJcblxyXG4gICAgc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT5cclxuICAgICAgc2hpcC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChlKSA9PiB7XHJcbiAgICAgICAgc2VsZWN0ZWRTaGlwTmFtZVdpdGhJbmRleCA9IGUudGFyZ2V0O1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PlxyXG4gICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW5kXCIsIChlKSA9PiB7XHJcbiAgICAgICAgZS50YXJnZXQuc3R5bGUudHJhbnNmb3JtID0gXCJzY2FsZSgxKVwiO1xyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICAgIGRvbUVsZW1lbnRzLmNvbXB1dGVyR2FtZWJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgKGUpID0+IHtcclxuICAgICAgKGNyb3NzaGFpclguc3R5bGUubGVmdCA9IGUuY2xpZW50WCArIFwicHhcIiksXHJcbiAgICAgICAgKGNyb3NzaGFpclguc3R5bGUudG9wID0gZS5jbGllbnRZICsgXCJweFwiKTtcclxuICAgICAgKGNyb3NzaGFpclkuc3R5bGUubGVmdCA9IGUuY2xpZW50WCArIFwicHhcIiksXHJcbiAgICAgICAgKGNyb3NzaGFpclkuc3R5bGUudG9wID0gZS5jbGllbnRZICsgXCJweFwiKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgbGV0IHNlbGVjdGVkU2hpcE5hbWVXaXRoSW5kZXg7XHJcbiAgbGV0IGRyYWdnZWRTaGlwO1xyXG5cclxuICBmdW5jdGlvbiBkcmFnKGUpIHtcclxuICAgIGRyYWdnZWRTaGlwID0gZS50YXJnZXQ7XHJcbiAgICBkcmFnZ2VkU2hpcC5zdHlsZS50cmFuc2Zvcm0gPSBcInNjYWxlKDApXCI7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkcmFnU3RhcnQoZSkge1xyXG4gICAgZHJhZ2dlZFNoaXAgPSBlLnRhcmdldDtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGRyYWdPdmVyKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGRyYWdFbnRlcihlKSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBkcmFnRHJvcChlKSB7XHJcbiAgICBjb25zdCBjZWxsID0gZS50YXJnZXQ7XHJcbiAgICBjb25zdCB7IG5hbWUgfSA9IGRyYWdnZWRTaGlwLmRhdGFzZXQ7XHJcblxyXG4gICAgY29uc3Qgc2hpcCA9IG1hdGNoU2hpcChwbGF5ZXJGbGVldCwgbmFtZSk7XHJcbiAgICBjb25zdCBpbmRleCA9IE51bWJlcihzZWxlY3RlZFNoaXBOYW1lV2l0aEluZGV4LmRhdGFzZXQuaW5kZXgpO1xyXG5cclxuICAgIGxldCB4ID0gTnVtYmVyKGNlbGwuZGF0YXNldC54KTtcclxuICAgIGxldCB5ID0gTnVtYmVyKGNlbGwuZGF0YXNldC55KTtcclxuICAgIC8vIGdldHMgdGhlIGNvcnJlY3Qgc3RhcnRpbmcgcG9pbnRcclxuICAgIGlmIChzaGlwLmRpcmVjdGlvbiA9PT0gXCJ2ZXJ0aWNhbFwiKSB7XHJcbiAgICAgIHggPSB4IC0gaW5kZXg7XHJcbiAgICB9XHJcbiAgICAvLyBnZXRzIHRoZSBjb3JyZWN0IHN0YXJ0aW5nIHBvaW50XHJcbiAgICBpZiAoc2hpcC5kaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XHJcbiAgICAgIHkgPSB5IC0gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcGxhY2VkID0gcGxheWVyQm9hcmQucGxhY2VTaGlwcyhzaGlwLCB4LCB5KTtcclxuXHJcbiAgICBpZiAocGxhY2VkKSB7XHJcbiAgICAgIGRyYWdnZWRTaGlwLnJlbW92ZSgpO1xyXG4gICAgICByZW5kZXJDb250cm9sbGVyKCkucmVuZGVyQm9hcmQoZG9tRWxlbWVudHMucGxheWVyR2FtZWJvYXJkLCBwbGF5ZXJCb2FyZCk7XHJcbiAgICAgIGRyYWdFdmVudExpc3RlbmVycygpO1xyXG5cclxuICAgICAgLy8gY2hlY2tzIGlmIGFsbCB0aGUgNSBzaGlwcyBoYXZlIGJlZW4gcGxhY2VkXHJcbiAgICAgIGlmIChwbGF5ZXJCb2FyZC5wbGFjZWRTaGlwcy5sZW5ndGggPT09IDUpIHtcclxuICAgICAgICBkb21FbGVtZW50cy5zZXR1cENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwicmVtb3ZlXCIpO1xyXG4gICAgICAgIGRvbUVsZW1lbnRzLnN0YXJ0QnV0dG9uQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHsgZHJhZ0V2ZW50TGlzdGVuZXJzIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IERyYWc7XHJcbiIsImltcG9ydCB7IGRvbUVsZW1lbnRzIH0gZnJvbSBcIi4vZG9tRWxlbWVudHNcIjtcclxuXHJcbmZ1bmN0aW9uIHJlbmRlckNvbnRyb2xsZXIoKSB7XHJcbiAgZnVuY3Rpb24gY2hlY2tGb3JTaGlwKGJvYXJkLCB4LCB5LCBjZWxsKSB7XHJcbiAgICBpZiAoYm9hcmRbeF1beV0gIT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gY2VsbC5jbGFzc0xpc3QuYWRkKGJvYXJkW3hdW3ldLm5hbWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY2hlY2tGb3JBdHRhY2soYm9hcmQsIHgsIHksIGNlbGwpIHtcclxuICAgIGlmIChib2FyZFt4XVt5XSA9PT0gXCJoaXRcIikge1xyXG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJoaXRcIik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGJvYXJkW3hdW3ldID09PSBcIm1pc3NcIikge1xyXG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJtaXNzXCIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY3JlYXRlQ2VsbChkb20sIHgsIHksIHR5cGUsIGJvYXJkKSB7XHJcbiAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImdyaWQtY2VsbFwiKTtcclxuICAgIGNoZWNrRm9yU2hpcChib2FyZCwgeCwgeSwgY2VsbCk7XHJcbiAgICBjaGVja0ZvckF0dGFjayhib2FyZCwgeCwgeSwgY2VsbCk7XHJcbiAgICBjZWxsLmlkID0gdHlwZTtcclxuICAgIGNlbGwuc2V0QXR0cmlidXRlKFwiZGF0YS14XCIsIGAke3h9YCk7XHJcbiAgICBjZWxsLnNldEF0dHJpYnV0ZShcImRhdGEteVwiLCBgJHt5fWApO1xyXG5cclxuICAgIGRvbS5hcHBlbmQoY2VsbCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW5kZXJCb2FyZChkb20sIGJvYXJkUmVjaWV2ZWQsIHR5cGUpIHtcclxuICAgIGRvbS50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICBjb25zdCBib2FyZCA9IGJvYXJkUmVjaWV2ZWQuZ2V0Qm9hcmQoKTtcclxuXHJcbiAgICBib2FyZC5mb3JFYWNoKCh4KSA9PiB7XHJcbiAgICAgIGJvYXJkLmZvckVhY2goKHkpID0+IHtcclxuICAgICAgICBjb25zdCByb3cgPSBib2FyZC5pbmRleE9mKHgpO1xyXG4gICAgICAgIGNvbnN0IGNvbCA9IGJvYXJkLmluZGV4T2YoeSk7XHJcbiAgICAgICAgY3JlYXRlQ2VsbChkb20sIHJvdywgY29sLCB0eXBlLCBib2FyZCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW5kZXJTaGlwKHNoaXApIHtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChcInNoaXBcIiwgYCR7c2hpcC5uYW1lfS1jb250YWluZXJgKTtcclxuICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJkYXRhLW5hbWVcIiwgYCR7c2hpcC5uYW1lfWApO1xyXG4gICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZShcImRyYWdnYWJsZVwiLCB0cnVlKTtcclxuXHJcbiAgICBsZXQgc2hpcERpdiA9IFwiXCI7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgc2hpcERpdiArPSBgPGRpdiBjbGFzcz1cInNoaXAtY2VsbFwiIGRhdGEtaW5kZXg9JyR7aX0nPjwvZGl2PmA7XHJcbiAgICB9XHJcbiAgICBjb250YWluZXIuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYWZ0ZXJiZWdpblwiLCBzaGlwRGl2KTtcclxuICAgIGRvbUVsZW1lbnRzLnNoaXBTZXR1cENvbnRhaW5lci5hcHBlbmQoY29udGFpbmVyKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbmRlckZsZWV0KHNoaXBzKSB7XHJcbiAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XHJcbiAgICAgIHJlbmRlclNoaXAoc2hpcCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJldHVybiB7IHJlbmRlckJvYXJkLCByZW5kZXJGbGVldCwgY2hlY2tGb3JTaGlwIH07XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgcmVuZGVyQ29udHJvbGxlcjtcclxuIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xyXG5cclxuY29uc3Qgc2hpcEluZm8gPSBbXHJcbiAgW1wiQ2FycmllclwiLCA1XSxcclxuICBbXCJCYXR0bGVzaGlwXCIsIDRdLFxyXG4gIFtcIkNydWlzZXJcIiwgM10sXHJcbiAgW1wiU3VibWFyaW5lXCIsIDNdLFxyXG4gIFtcIkRlc3Ryb3llclwiLCAyXSxcclxuXTtcclxuXHJcbmNvbnN0IGNyZWF0ZVNoaXBzID0gKCkgPT4ge1xyXG4gIGNvbnN0IHNoaXBBcnJheSA9IFtdO1xyXG4gIHNoaXBJbmZvLmZvckVhY2goKHNoaXApID0+IHtcclxuICAgIHNoaXBBcnJheS5wdXNoKFNoaXAoc2hpcFswXSwgc2hpcFsxXSkpO1xyXG4gIH0pO1xyXG4gIHJldHVybiBzaGlwQXJyYXk7XHJcbn07XHJcblxyXG4vLyBmbGVldCB1c2VkIG1haW5seSBmb3IgdGhlIHRlc3RpbmdcclxuZnVuY3Rpb24gZmxlZXQoKSB7XHJcbiAgY29uc3QgQ2FycmllciA9ICgpID0+IG5ldyBTaGlwKFwiQ2FycmllclwiLCA1KTtcclxuXHJcbiAgY29uc3QgQmF0dGxlc2hpcCA9ICgpID0+IG5ldyBTaGlwKFwiQmF0dGxlc2hpcFwiLCA0KTtcclxuXHJcbiAgY29uc3QgQ3J1aXNlciA9ICgpID0+IG5ldyBTaGlwKFwiQ3J1aXNlclwiLCAzKTtcclxuXHJcbiAgY29uc3QgU3VibWFyaW5lID0gKCkgPT4gbmV3IFNoaXAoXCJTdWJtYXJpbmVcIiwgMyk7XHJcblxyXG4gIGNvbnN0IERlc3Ryb3llciA9ICgpID0+IG5ldyBTaGlwKFwiRGVzdHJveWVyXCIsIDIpO1xyXG5cclxuICByZXR1cm4geyBDYXJyaWVyLCBCYXR0bGVzaGlwLCBDcnVpc2VyLCBTdWJtYXJpbmUsIERlc3Ryb3llciB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYXRjaFNoaXAocGxheWVyRmxlZXQsIG5hbWUpIHtcclxuICBsZXQgbWF0Y2hlZFNoaXA7XHJcbiAgcGxheWVyRmxlZXQuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgaWYgKHNoaXAubmFtZSA9PT0gbmFtZSkge1xyXG4gICAgICBtYXRjaGVkU2hpcCA9IHNoaXA7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgcmV0dXJuIG1hdGNoZWRTaGlwO1xyXG59XHJcblxyXG5leHBvcnQgeyBmbGVldCwgY3JlYXRlU2hpcHMsIG1hdGNoU2hpcCB9O1xyXG4iLCJpbXBvcnQge1xyXG4gIGNoYXRCb3hDb250cm9sbGVyLFxyXG4gIGRvbUVsZW1lbnRzLFxyXG4gIHJlc3RhcnRET01NYW5pcHVsYXRpb24sXHJcbiAgdG9nZ2xlQ2xpY2tCbG9ja2VyLFxyXG59IGZyb20gXCIuL2Rpc3BsYXlDb250cm9sbGVyL2RvbUVsZW1lbnRzXCI7XHJcbmltcG9ydCB7IGNyZWF0ZVNoaXBzIH0gZnJvbSBcIi4vZmxlZXRcIjtcclxuaW1wb3J0IHJlbmRlckNvbnRyb2xsZXIgZnJvbSBcIi4vZGlzcGxheUNvbnRyb2xsZXIvcmVuZGVyQ29udHJvbGxlclwiO1xyXG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xyXG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xyXG5pbXBvcnQgRHJhZyBmcm9tIFwiLi9kaXNwbGF5Q29udHJvbGxlci9kcmFnXCI7XHJcblxyXG5mdW5jdGlvbiBHYW1lKCkge1xyXG4gIGxldCBwbGF5ZXJGbGVldCA9IGNyZWF0ZVNoaXBzKCk7XHJcbiAgbGV0IGNwdUZsZWV0ID0gY3JlYXRlU2hpcHMoKTtcclxuXHJcbiAgY29uc3QgcGxheWVyID0gUGxheWVyKFwiaHVtYW5cIik7XHJcbiAgY29uc3QgY29tcHV0ZXIgPSBQbGF5ZXIoXCJjb21wdXRlclwiKTtcclxuXHJcbiAgbGV0IHBsYXllckJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xyXG4gIGxldCBjb21wdXRlckJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xyXG5cclxuICBmdW5jdGlvbiBnYW1lT3ZlcihwbGF5ZXJCb2FyZCwgY29tcHV0ZXJCb2FyZCkge1xyXG4gICAgaWYgKHBsYXllckJvYXJkLmNoZWNrR2FtZU92ZXIoKSA9PT0gdHJ1ZSkge1xyXG4gICAgICBkb21FbGVtZW50cy5tb2RhbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICBkb21FbGVtZW50cy53aW5uZXIuaW5uZXJUZXh0ID0gXCJZb3UgTG9zdFwiO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGlmIChjb21wdXRlckJvYXJkLmNoZWNrR2FtZU92ZXIoKSA9PT0gdHJ1ZSkge1xyXG4gICAgICBkb21FbGVtZW50cy5tb2RhbENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICBkb21FbGVtZW50cy53aW5uZXIuaW5uZXJUZXh0ID0gXCJZb3UgV2luIVwiO1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGJvYXJkQXR0YWNrKGUpIHtcclxuICAgIGNvbnN0IGNlbGwgPSBlLnRhcmdldDtcclxuXHJcbiAgICBpZiAoY2VsbC5pZCAhPT0gXCJjb21wdXRlclwiKSByZXR1cm47XHJcbiAgICBjb25zdCB7IHggfSA9IGNlbGwuZGF0YXNldDtcclxuICAgIGNvbnN0IHsgeSB9ID0gY2VsbC5kYXRhc2V0O1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvbXBBdHRhY2soKSB7XHJcbiAgICAgIGNvbnN0IHJhbmQgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAoMjAwMCAtIDUwMCkpICsgMTAwMDtcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgY29tcHV0ZXIucmFuZG9tQXR0YWNrKHBsYXllckJvYXJkKTtcclxuICAgICAgICByZW5kZXJDb250cm9sbGVyKCkucmVuZGVyQm9hcmQoXHJcbiAgICAgICAgICBkb21FbGVtZW50cy5wbGF5ZXJHYW1lYm9hcmQsXHJcbiAgICAgICAgICBwbGF5ZXJCb2FyZCxcclxuICAgICAgICAgIGNvbXB1dGVyLnBsYXllclxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIGNoZWNraW5nIGlmIGdhbWVzIG92ZXJcclxuICAgICAgICBpZiAoZ2FtZU92ZXIocGxheWVyQm9hcmQsIGNvbXB1dGVyQm9hcmQpID09PSB0cnVlKSByZXR1cm47XHJcbiAgICAgICAgZG9tRWxlbWVudHMuY29tcHV0ZXJHYW1lYm9hcmQuc3R5bGUuYm9yZGVyID0gXCIzcHggc29saWQgcmVkXCI7XHJcbiAgICAgICAgZG9tRWxlbWVudHMucGxheWVyR2FtZWJvYXJkLnN0eWxlLmJvcmRlciA9IFwiM3B4IHNvbGlkIHdoaXRlXCI7XHJcbiAgICAgICAgdG9nZ2xlQ2xpY2tCbG9ja2VyKCk7XHJcbiAgICAgIH0sIHJhbmQpO1xyXG4gICAgfVxyXG4gICAgcGxheWVyLnBsYWNlQXR0YWNrKHgsIHksIGNvbXB1dGVyQm9hcmQpO1xyXG5cclxuICAgIGlmIChwbGF5ZXIucGxhY2VBdHRhY2spIHtcclxuICAgICAgaWYgKGNvbXB1dGVyQm9hcmQuYm9hcmRbeF1beV0gPT09IFwiaGl0XCIpIHtcclxuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoY29tcHV0ZXJCb2FyZC5ib2FyZFt4XVt5XSA9PT0gXCJtaXNzXCIpIHtcclxuICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoZ2FtZU92ZXIocGxheWVyQm9hcmQsIGNvbXB1dGVyQm9hcmQpID09PSB0cnVlKSByZXR1cm47XHJcbiAgICAgIHRvZ2dsZUNsaWNrQmxvY2tlcigpO1xyXG4gICAgICBkb21FbGVtZW50cy5wbGF5ZXJHYW1lYm9hcmQuc3R5bGUuYm9yZGVyID0gXCIzcHggc29saWQgcmVkXCI7XHJcbiAgICAgIGRvbUVsZW1lbnRzLmNvbXB1dGVyR2FtZWJvYXJkLnN0eWxlLmJvcmRlciA9IFwiM3B4IHNvbGlkIHdoaXRlXCI7XHJcbiAgICAgIGNvbXBBdHRhY2soKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGdyaWRMaXN0ZW5lcigpIHtcclxuICAgIGNvbnN0IGdyaWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmdyaWQtY2VsbFwiKTtcclxuXHJcbiAgICBncmlkLmZvckVhY2goKGNlbGwpID0+XHJcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICBcImNsaWNrXCIsXHJcbiAgICAgICAgKGUpID0+IHtcclxuICAgICAgICAgIGJvYXJkQXR0YWNrKGUpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeyBvbmNlOiB0cnVlIH1cclxuICAgICAgKVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGZsZWV0Q2hhbmdlRGlyZWN0aW9uKCkge1xyXG4gICAgcGxheWVyRmxlZXQuZm9yRWFjaCgoc2hpcCkgPT4ge1xyXG4gICAgICBzaGlwLmNoYW5nZURpcmVjdGlvbigpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW5kZXJHYW1lYm9hcmRzKCkge1xyXG4gICAgcmVuZGVyQ29udHJvbGxlcigpLnJlbmRlckJvYXJkKFxyXG4gICAgICBkb21FbGVtZW50cy5wbGF5ZXJHYW1lYm9hcmQsXHJcbiAgICAgIHBsYXllckJvYXJkLFxyXG4gICAgICBwbGF5ZXIucGxheWVyXHJcbiAgICApO1xyXG4gICAgcmVuZGVyQ29udHJvbGxlcigpLnJlbmRlckJvYXJkKFxyXG4gICAgICBkb21FbGVtZW50cy5jb21wdXRlckdhbWVib2FyZCxcclxuICAgICAgY29tcHV0ZXJCb2FyZCxcclxuICAgICAgY29tcHV0ZXIucGxheWVyXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcGxhY2VTaW5nbGUoc2hpcCkge1xyXG4gICAgY29uc3QgeCA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDkpO1xyXG4gICAgY29uc3QgeSA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDkpO1xyXG4gICAgY29uc3QgY2hhbmdlRGlyZWN0aW9uID0gTWF0aC5yYW5kb20oKSA+IDAuNTtcclxuICAgIGlmIChjaGFuZ2VEaXJlY3Rpb24pIHNoaXAuY2hhbmdlRGlyZWN0aW9uKCk7XHJcbiAgICBjb25zdCBwbGFjZWQgPSBjb21wdXRlckJvYXJkLnBsYWNlU2hpcHMoc2hpcCwgeCwgeSk7XHJcbiAgICBpZiAoIXBsYWNlZCkgcGxhY2VTaW5nbGUoc2hpcCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhdXRvUGxhY2VTaGlwcygpIHtcclxuICAgIGNwdUZsZWV0LmZvckVhY2goKHNoaXApID0+IHtcclxuICAgICAgY29uc3QgeCA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDkpO1xyXG4gICAgICBjb25zdCB5ID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogOSk7XHJcbiAgICAgIGNvbnN0IGNoYW5nZURpcmVjdGlvbiA9IE1hdGgucmFuZG9tKCkgPiAwLjU7XHJcbiAgICAgIGlmIChjaGFuZ2VEaXJlY3Rpb24pIHNoaXAuY2hhbmdlRGlyZWN0aW9uKCk7XHJcbiAgICAgIGNvbnN0IHBsYWNlZCA9IGNvbXB1dGVyQm9hcmQucGxhY2VTaGlwcyhzaGlwLCB4LCB5KTtcclxuICAgICAgaWYgKCFwbGFjZWQpIHBsYWNlU2luZ2xlKHNoaXApO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzdGFydCgpIHtcclxuICAgIGF1dG9QbGFjZVNoaXBzKCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZW5kZXJTaGlwcygpIHtcclxuICAgIHJlbmRlckNvbnRyb2xsZXIoKS5yZW5kZXJGbGVldChwbGF5ZXJGbGVldCk7XHJcbiAgICBEcmFnKHBsYXllckJvYXJkLCBwbGF5ZXJGbGVldCkuZHJhZ0V2ZW50TGlzdGVuZXJzKCk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiByZXN0YXJ0R2FtZSgpIHtcclxuICAgIHBsYXllckZsZWV0ID0gY3JlYXRlU2hpcHMoKTtcclxuICAgIGNwdUZsZWV0ID0gY3JlYXRlU2hpcHMoKTtcclxuICAgIHBsYXllckJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xyXG4gICAgY29tcHV0ZXJCb2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcclxuICAgIHJlbmRlckdhbWVib2FyZHMoKTtcclxuICAgIHJlbmRlclNoaXBzKCk7XHJcbiAgICBncmlkTGlzdGVuZXIoKTtcclxuICAgIHJlc3RhcnRET01NYW5pcHVsYXRpb24oKTtcclxuICB9XHJcblxyXG4gIC8vIHJlc2V0IHJvdW5kIGJ1dHRvbiBsaXN0ZW5lclxyXG4gIGZ1bmN0aW9uIHJlc2V0RXZlbnQoKSB7XHJcbiAgICBkb21FbGVtZW50cy5yZXNldEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICBcImNsaWNrXCIsXHJcbiAgICAgICgpID0+IHtcclxuICAgICAgICBjaGF0Qm94Q29udHJvbGxlcihcInJlc2V0XCIpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgcmVzdGFydEdhbWUoKTtcclxuICAgICAgICB9LCAzMDAwKTtcclxuICAgICAgfSxcclxuICAgICAgeyBvbmNlOiB0cnVlIH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgcmVuZGVyR2FtZWJvYXJkcyxcclxuICAgIHJlbmRlclNoaXBzLFxyXG4gICAgYm9hcmRBdHRhY2ssXHJcbiAgICBmbGVldENoYW5nZURpcmVjdGlvbixcclxuICAgIHN0YXJ0LFxyXG4gICAgcmVzdGFydEdhbWUsXHJcbiAgICBncmlkTGlzdGVuZXIsXHJcbiAgICByZXNldEV2ZW50LFxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdhbWU7XHJcbiIsImltcG9ydCB7IGNoYXRCb3hDb250cm9sbGVyIH0gZnJvbSBcIi4vZGlzcGxheUNvbnRyb2xsZXIvZG9tRWxlbWVudHNcIjtcclxuXHJcbmZ1bmN0aW9uIEdhbWVib2FyZCgpIHtcclxuICBjb25zdCBwbGFjZWRTaGlwcyA9IFtdO1xyXG4gIGNvbnN0IGF0dGFja0xvZyA9IFtdO1xyXG5cclxuICAvLyAxMHgxMCBib2FyZFxyXG4gIGNvbnN0IGJvYXJkID0gbmV3IEFycmF5KDEwKS5maWxsKG51bGwpLm1hcCgoKSA9PiBBcnJheSgxMCkuZmlsbChudWxsKSk7XHJcbiAgY29uc3QgZ2V0Qm9hcmQgPSAoKSA9PiBib2FyZDtcclxuXHJcbiAgZnVuY3Rpb24gY2hlY2tQb3NzaWJsZVBsYWNlbWVudChzaGlwLCB4LCB5LCBib2FyZCkge1xyXG4gICAgbGV0IG51bSA9IDA7XHJcbiAgICAvLyBkaXNhbGxvd2luZyBwbGFjZW1lbnRzIG91dHNpZGUgdGhlIGJvYXJkIHJldHVybiBmYWxzZVxyXG4gICAgaWYgKHggPCAwIHx8IHggPiA5IHx8IHkgPCAwIHx8IHkgPiA5KSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBpZiBzaGlwIGRvZXNuJ3QgZml0IGluc2lkZSB0aGUgYm9hcmQgcmV0dXJuIGZhbHNlXHJcbiAgICBpZiAoc2hpcC5kaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XHJcbiAgICAgIGlmICh5ICsgc2hpcC5sZW5ndGggPiAxMCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAvL2lmIGFueSBzcXVhcmUgYWxvbmcgdGhlIHNoaXBzIHBhdGggaXMgbm90IG51bGwgZW5kIHJlc3VsdCBpcyBhIGZhbHNlIG9uIHBvc3NpYmxlIHJlcGxhY2VtZW50XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgIGlmIChib2FyZFt4XVt5ICsgaV0gIT0gbnVsbCkge1xyXG4gICAgICAgICAgbnVtICs9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHNoaXAuZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcclxuICAgICAgaWYgKHggKyBzaGlwLmxlbmd0aCA+IDEwKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICBpZiAoYm9hcmRbeCArIGldW3ldICE9IG51bGwpIHtcclxuICAgICAgICAgIG51bSArPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChudW0gPiAwKSByZXR1cm4gZmFsc2U7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHBsYWNlU2hpcHMoc2hpcCwgeCwgeSkge1xyXG4gICAgLy8gcmV0dXJuIGZhbHNlIGlmIHdlIGNhbid0IHBhc3MgdGhlIGNoZWNrXHJcbiAgICBpZiAoIWNoZWNrUG9zc2libGVQbGFjZW1lbnQoc2hpcCwgeCwgeSwgYm9hcmQpKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgaWYgKHNoaXAuZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSArPSAxKSB7XHJcbiAgICAgICAgdGhpcy5ib2FyZFt4ICsgaV1beV0gPSBzaGlwO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoc2hpcC5kaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xyXG4gICAgICAgIHRoaXMuYm9hcmRbeF1beSArIGldID0gc2hpcDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8ga2VlcHMgdHJhY2sgb2YgdGhlIHNoaXBzIHBsYWNlZFxyXG4gICAgcmV0dXJuIHRoaXMucGxhY2VkU2hpcHMucHVzaChzaGlwKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlY2lldmVBdHRhY2soeCwgeSwgcGxheWVyKSB7XHJcbiAgICBpZiAoYm9hcmRbeF1beV0gIT0gbnVsbCkge1xyXG4gICAgICBhdHRhY2tMb2cucHVzaCh7IGhpdDogeyB4LCB5IH0gfSk7XHJcblxyXG4gICAgICAvLyBib2FyZFt4XVt5XSBpcyB0aGUgc2hpcCwgcnVucyBoaXQgZnVuY3Rpb24gb24gdGhlIHNoaXBcclxuICAgICAgdGhpcy5ib2FyZFt4XVt5XS5oaXQoKTtcclxuICAgICAgY2hhdEJveENvbnRyb2xsZXIodGhpcy5ib2FyZFt4XVt5XSwgcGxheWVyKTtcclxuICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9IFwiaGl0XCI7XHJcbiAgICB9XHJcbiAgICBpZiAoYm9hcmRbeF1beV0gPT09IG51bGwpIHtcclxuICAgICAgYXR0YWNrTG9nLnB1c2goeyBtaXNzOiB7IHgsIHkgfSB9KTtcclxuICAgICAgY2hhdEJveENvbnRyb2xsZXIodGhpcy5ib2FyZFt4XVt5XSwgcGxheWVyKTtcclxuICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9IFwibWlzc1wiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY2hlY2tHYW1lT3ZlcigpIHtcclxuICAgIGlmIChwbGFjZWRTaGlwcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSkpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgYm9hcmQsXHJcbiAgICBwbGFjZVNoaXBzLFxyXG4gICAgcGxhY2VkU2hpcHMsXHJcbiAgICByZWNpZXZlQXR0YWNrLFxyXG4gICAgYXR0YWNrTG9nLFxyXG4gICAgY2hlY2tHYW1lT3ZlcixcclxuICAgIGdldEJvYXJkLFxyXG4gIH07XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xyXG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby11bm5lZWRlZC10ZXJuYXJ5ICovXHJcblxyXG5mdW5jdGlvbiBQbGF5ZXIodHlwZSkge1xyXG4gIGNvbnN0IHBsYXllciA9IHR5cGU7XHJcbiAgLy8gc2V0cyBodW1hbiB0dXJuIHRvIHRydWUgYW5kIGNvbXB1dGVycyB0byBmYWxzZVxyXG4gIGNvbnN0IHR1cm4gPSBwbGF5ZXIgPT09IFwiaHVtYW5cIiA/IHRydWUgOiBmYWxzZTtcclxuXHJcbiAgZnVuY3Rpb24gcmFuZG9tQXR0YWNrKGJvYXJkKSB7XHJcbiAgICBjb25zdCB4ID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogOSk7XHJcbiAgICBjb25zdCB5ID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogOSk7XHJcbiAgICBpZiAoYm9hcmQuYm9hcmRbeF1beV0gPT09IFwibWlzc1wiIHx8IGJvYXJkLmJvYXJkW3hdW3ldID09PSBcImhpdFwiKSB7XHJcbiAgICAgIHJhbmRvbUF0dGFjayhib2FyZCk7XHJcbiAgICB9IGVsc2UgYm9hcmQucmVjaWV2ZUF0dGFjayh4LCB5KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHBsYWNlQXR0YWNrKHgsIHksIGJvYXJkKSB7XHJcbiAgICBpZiAocGxheWVyID09PSBcImh1bWFuXCIpIHtcclxuICAgICAgYm9hcmQucmVjaWV2ZUF0dGFjayh4LCB5LCBwbGF5ZXIpO1xyXG4gICAgfVxyXG4gICAgaWYgKHBsYXllciA9PT0gXCJjb21wdXRlclwiKSB7XHJcbiAgICAgIHJhbmRvbUF0dGFjaygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gc3dpdGNoVHVybigpIHtcclxuICAgIGlmICh0aGlzLnR1cm4gPT09IHRydWUpIHtcclxuICAgICAgdGhpcy50dXJuID0gZmFsc2U7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLnR1cm4gPT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMudHVybiA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4geyByYW5kb21BdHRhY2ssIHBsYWNlQXR0YWNrLCBwbGF5ZXIsIHN3aXRjaFR1cm4sIHR1cm4gfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xyXG4iLCJmdW5jdGlvbiBTaGlwKHNoaXBOYW1lLCBzaXplKSB7XHJcbiAgY29uc3QgbmFtZSA9IHNoaXBOYW1lO1xyXG4gIGNvbnN0IGxlbmd0aCA9IHNpemU7XHJcbiAgY29uc3QgaXNTaGlwU3VuayA9IGZhbHNlO1xyXG4gIGNvbnN0IGRpcmVjdGlvbiA9IFwidmVydGljYWxcIjtcclxuXHJcbiAgY29uc3QgaGl0cyA9IG5ldyBBcnJheShsZW5ndGgpLmZpbGwobnVsbCk7XHJcblxyXG4gIGZ1bmN0aW9uIGhpdCgpIHtcclxuICAgIGhpdHMucHVzaChcImhpdFwiKTtcclxuICAgIGhpdHMuc2hpZnQoKTtcclxuXHJcbiAgICBpZiAoaGl0cy5ldmVyeSgodmFsKSA9PiB2YWwgPT09IFwiaGl0XCIpKSB7XHJcbiAgICAgIHRoaXMuaXNTaGlwU3VuayA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBpc1N1bmsoKSB7XHJcbiAgICBpZiAodGhpcy5pc1NoaXBTdW5rID09PSB0cnVlKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gY2hhbmdlRGlyZWN0aW9uKCkge1xyXG4gICAgaWYgKHRoaXMuZGlyZWN0aW9uID09PSBcInZlcnRpY2FsXCIpIHtcclxuICAgICAgdGhpcy5kaXJlY3Rpb24gPSBcImhvcml6b250YWxcIjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5kaXJlY3Rpb24gPT09IFwiaG9yaXpvbnRhbFwiKSB7XHJcbiAgICAgIHRoaXMuZGlyZWN0aW9uID0gXCJ2ZXJ0aWNhbFwiO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIG5hbWUsXHJcbiAgICBsZW5ndGgsXHJcbiAgICBoaXRzLFxyXG4gICAgaGl0LFxyXG4gICAgaXNTaGlwU3VuayxcclxuICAgIGlzU3VuayxcclxuICAgIGRpcmVjdGlvbixcclxuICAgIGNoYW5nZURpcmVjdGlvbixcclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xyXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi5tYWluID4gLnBsYXllci1ib2FyZCB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI0LCAzNSwgNDQsIDAuNSk7XFxyXFxuICBkaXNwbGF5OiBncmlkO1xcclxcbiAgZ3JpZC10ZW1wbGF0ZTogcmVwZWF0KDEwLCAxZnIpIC8gcmVwZWF0KDEwLCAxZnIpO1xcclxcbiAgYm9yZGVyOiAzcHggc29saWQgd2hpdGU7XFxyXFxuICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxyXFxuICBtYXJnaW4tbGVmdDogLTEwMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubWFpbiA+IC5wbGF5ZXItYm9hcmQudHJhbnNmb3JtIHtcXHJcXG4gIHRyYW5zZm9ybTogc2NhbGUoMC43NSk7XFxyXFxuICBhbmltYXRpb246IHBsYXllckJvYXJkIDAuNzdzIGxpbmVhcjtcXHJcXG4gIG1hcmdpbi1yaWdodDogMjBweDtcXHJcXG4gIG1hcmdpbi1sZWZ0OiAtMjAwcHg7XFxyXFxufVxcclxcblxcclxcbkBrZXlmcmFtZXMgcGxheWVyQm9hcmQge1xcclxcbiAgMCUge1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxyXFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XFxyXFxuICB9XFxyXFxuICA1MCUge1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxyXFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMC43NSk7XFxyXFxuICB9XFxyXFxuICAxMDAlIHtcXHJcXG4gICAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xcclxcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNzUpO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG4ubWFpbiA+IC5jb21wdXRlci1ib2FyZCB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI0LCAzNSwgNDQsIDAuNSk7XFxyXFxuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoMTAsIDFmcikgLyByZXBlYXQoMTAsIDFmcik7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbiAgYm9yZGVyOiAzcHggc29saWQgcmVkO1xcclxcbiAgY3Vyc29yOiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4ubWFpbiA+IC5jb21wdXRlci1ib2FyZC5hY3RpdmUge1xcclxcbiAgdHJhbnNpdGlvbjogYWxsIDYwMG1zIGVhc2Utb3V0O1xcclxcbiAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxufVxcclxcblxcclxcbi8qIGJsb2NrcyB0aGUgY2xpY2sgZXZlbnQgd2hlbiBpdHMgbm90IHRoZSBwbGF5ZXJzIHR1cm4gKi9cXHJcXG4uYmxvY2tlcjphY3RpdmUge1xcclxcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5ncmlkLWNlbGwge1xcclxcbiAgd2lkdGg6IDMuMXJlbTtcXHJcXG4gIGhlaWdodDogMy4xcmVtO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxyXFxufVxcclxcblxcclxcbi5oaXQge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIxNCwgNDIsIDQyKTtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJlZDtcXHJcXG59XFxyXFxuXFxyXFxuLm1pc3Mge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDQ2LCAxMywgMjM1KTtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYigwLCAzLCAxNjApO1xcclxcbn1cXHJcXG5cXHJcXG4uY3Jvc3NoYWlyWCB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbiAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHRyYW5zbGF0ZVkoLTUwJSk7XFxyXFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXHJcXG4gIHdpZHRoOiA3JTtcXHJcXG4gIHotaW5kZXg6IDExMTE7XFxyXFxuICB0cmFuc2l0aW9uOiBhbGwgMG1zIGVhc2Utb3V0O1xcclxcbiAgYm9yZGVyOiAzcHggZGFzaGVkIHJnYig5MCwgMTg5LCA2MCk7XFxyXFxufVxcclxcblxcclxcbi5jcm9zc2hhaXJYLmFjdGl2ZSB7XFxyXFxuICBkaXNwbGF5OiBpbml0aWFsO1xcclxcbn1cXHJcXG5cXHJcXG4uY3Jvc3NoYWlyWSB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbiAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpIHRyYW5zbGF0ZVkoLTUwJSkgcm90YXRlKDkwZGVnKTtcXHJcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcclxcbiAgd2lkdGg6IDclO1xcclxcbiAgei1pbmRleDogMTExMTtcXHJcXG4gIHRyYW5zaXRpb246IGFsbCAwbXMgZWFzZS1vdXQ7XFxyXFxuICBib3JkZXI6IDNweCBkYXNoZWQgcmdiKDkwLCAxODksIDYwKTtcXHJcXG59XFxyXFxuXFxyXFxuLmNyb3NzaGFpclkuYWN0aXZlIHtcXHJcXG4gIGRpc3BsYXk6IGluaXRpYWw7XFxyXFxufVxcclxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvYm9hcmQuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsdUNBQXVDO0VBQ3ZDLGFBQWE7RUFDYixnREFBZ0Q7RUFDaEQsdUJBQXVCO0VBQ3ZCLGtCQUFrQjtFQUNsQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsbUNBQW1DO0VBQ25DLGtCQUFrQjtFQUNsQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRTtJQUNFLGtCQUFrQjtJQUNsQixtQkFBbUI7RUFDckI7RUFDQTtJQUNFLGtCQUFrQjtJQUNsQixzQkFBc0I7RUFDeEI7RUFDQTtJQUNFLGtCQUFrQjtJQUNsQixzQkFBc0I7RUFDeEI7QUFDRjs7QUFFQTtFQUNFLHVDQUF1QztFQUN2QyxnREFBZ0Q7RUFDaEQsYUFBYTtFQUNiLHFCQUFxQjtFQUNyQixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSw4QkFBOEI7RUFDOUIsbUJBQW1CO0VBQ25CLGFBQWE7QUFDZjs7QUFFQSx5REFBeUQ7QUFDekQ7RUFDRSxvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsY0FBYztFQUNkLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGtDQUFrQztFQUNsQyxxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxrQ0FBa0M7RUFDbEMsZ0NBQWdDO0FBQ2xDOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGVBQWU7RUFDZiw0Q0FBNEM7RUFDNUMsb0JBQW9CO0VBQ3BCLFNBQVM7RUFDVCxhQUFhO0VBQ2IsNEJBQTRCO0VBQzVCLG1DQUFtQztBQUNyQzs7QUFFQTtFQUNFLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixlQUFlO0VBQ2YsMERBQTBEO0VBQzFELG9CQUFvQjtFQUNwQixTQUFTO0VBQ1QsYUFBYTtFQUNiLDRCQUE0QjtFQUM1QixtQ0FBbUM7QUFDckM7O0FBRUE7RUFDRSxnQkFBZ0I7QUFDbEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLm1haW4gPiAucGxheWVyLWJvYXJkIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjQsIDM1LCA0NCwgMC41KTtcXHJcXG4gIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICBncmlkLXRlbXBsYXRlOiByZXBlYXQoMTAsIDFmcikgLyByZXBlYXQoMTAsIDFmcik7XFxyXFxuICBib3JkZXI6IDNweCBzb2xpZCB3aGl0ZTtcXHJcXG4gIG1hcmdpbi1yaWdodDogMjBweDtcXHJcXG4gIG1hcmdpbi1sZWZ0OiAtMTAwcHg7XFxyXFxufVxcclxcblxcclxcbi5tYWluID4gLnBsYXllci1ib2FyZC50cmFuc2Zvcm0ge1xcclxcbiAgdHJhbnNmb3JtOiBzY2FsZSgwLjc1KTtcXHJcXG4gIGFuaW1hdGlvbjogcGxheWVyQm9hcmQgMC43N3MgbGluZWFyO1xcclxcbiAgbWFyZ2luLXJpZ2h0OiAyMHB4O1xcclxcbiAgbWFyZ2luLWxlZnQ6IC0yMDBweDtcXHJcXG59XFxyXFxuXFxyXFxuQGtleWZyYW1lcyBwbGF5ZXJCb2FyZCB7XFxyXFxuICAwJSB7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogMjBweDtcXHJcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcXHJcXG4gIH1cXHJcXG4gIDUwJSB7XFxyXFxuICAgIG1hcmdpbi1yaWdodDogMjBweDtcXHJcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjc1KTtcXHJcXG4gIH1cXHJcXG4gIDEwMCUge1xcclxcbiAgICBtYXJnaW4tcmlnaHQ6IDIwcHg7XFxyXFxuICAgIHRyYW5zZm9ybTogc2NhbGUoMC43NSk7XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbi5tYWluID4gLmNvbXB1dGVyLWJvYXJkIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjQsIDM1LCA0NCwgMC41KTtcXHJcXG4gIGdyaWQtdGVtcGxhdGU6IHJlcGVhdCgxMCwgMWZyKSAvIHJlcGVhdCgxMCwgMWZyKTtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxuICBib3JkZXI6IDNweCBzb2xpZCByZWQ7XFxyXFxuICBjdXJzb3I6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5tYWluID4gLmNvbXB1dGVyLWJvYXJkLmFjdGl2ZSB7XFxyXFxuICB0cmFuc2l0aW9uOiBhbGwgNjAwbXMgZWFzZS1vdXQ7XFxyXFxuICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xcclxcbiAgZGlzcGxheTogZ3JpZDtcXHJcXG59XFxyXFxuXFxyXFxuLyogYmxvY2tzIHRoZSBjbGljayBldmVudCB3aGVuIGl0cyBub3QgdGhlIHBsYXllcnMgdHVybiAqL1xcclxcbi5ibG9ja2VyOmFjdGl2ZSB7XFxyXFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLmdyaWQtY2VsbCB7XFxyXFxuICB3aWR0aDogMy4xcmVtO1xcclxcbiAgaGVpZ2h0OiAzLjFyZW07XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXHJcXG59XFxyXFxuXFxyXFxuLmhpdCB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjE0LCA0MiwgNDIpO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgcmVkO1xcclxcbn1cXHJcXG5cXHJcXG4ubWlzcyB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoNDYsIDEzLCAyMzUpO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiKDAsIDMsIDE2MCk7XFxyXFxufVxcclxcblxcclxcbi5jcm9zc2hhaXJYIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxuICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgdHJhbnNsYXRlWSgtNTAlKTtcXHJcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcclxcbiAgd2lkdGg6IDclO1xcclxcbiAgei1pbmRleDogMTExMTtcXHJcXG4gIHRyYW5zaXRpb246IGFsbCAwbXMgZWFzZS1vdXQ7XFxyXFxuICBib3JkZXI6IDNweCBkYXNoZWQgcmdiKDkwLCAxODksIDYwKTtcXHJcXG59XFxyXFxuXFxyXFxuLmNyb3NzaGFpclguYWN0aXZlIHtcXHJcXG4gIGRpc3BsYXk6IGluaXRpYWw7XFxyXFxufVxcclxcblxcclxcbi5jcm9zc2hhaXJZIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxuICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgdHJhbnNsYXRlWSgtNTAlKSByb3RhdGUoOTBkZWcpO1xcclxcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxyXFxuICB3aWR0aDogNyU7XFxyXFxuICB6LWluZGV4OiAxMTExO1xcclxcbiAgdHJhbnNpdGlvbjogYWxsIDBtcyBlYXNlLW91dDtcXHJcXG4gIGJvcmRlcjogM3B4IGRhc2hlZCByZ2IoOTAsIDE4OSwgNjApO1xcclxcbn1cXHJcXG5cXHJcXG4uY3Jvc3NoYWlyWS5hY3RpdmUge1xcclxcbiAgZGlzcGxheTogaW5pdGlhbDtcXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVRfUlVMRV9JTVBPUlRfMF9fXyBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL2JvYXJkLmNzc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVRfUlVMRV9JTVBPUlRfMV9fXyBmcm9tIFwiLSEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3NoaXBzLmNzc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9QWxmYStTbGFiK09uZSZmYW1pbHk9QW50b24mZGlzcGxheT1zd2FwKTtcIl0pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UHJlc3MrU3RhcnQrMlAmZGlzcGxheT1zd2FwKTtcIl0pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18uaShfX19DU1NfTE9BREVSX0FUX1JVTEVfSU1QT1JUXzBfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18uaShfX19DU1NfTE9BREVSX0FUX1JVTEVfSU1QT1JUXzFfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKiB7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjksIDg1LCAxMzgpO1xcclxcbn1cXHJcXG5cXHJcXG5oZWFkZXIge1xcclxcbiAgcGFkZGluZy10b3A6IDQwcHg7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBmb250LWZhbWlseTogXFxcIkFsZmEgU2xhYiBPbmVcXFwiLCBjdXJzaXZlO1xcclxcbiAgZm9udC1zaXplOiAxMDBweDtcXHJcXG4gIGxldHRlci1zcGFjaW5nOiAzcHg7XFxyXFxuICB0ZXh0LXNoYWRvdzogMXB4IDFweCAwICMyNjI2MjYsIDJweCAycHggMCAjMjYyNjI2LCAzcHggM3B4IDAgIzI2MjYyNixcXHJcXG4gICAgNHB4IDRweCAwICMyNjI2MjYsIDVweCA1cHggMCAjMjYyNjI2LCAxcHggMXB4IDAgIzI2MjYyNixcXHJcXG4gICAgNnB4IDIwcHggMjBweCByZ2JhKDAsIDAsIDAsIDEpLCAtMXB4IC0xcHggMCByZ2IoMTQxLCAxMzUsIDEzNSk7XFxyXFxuICBjb2xvcjogI2YxZjFmMTtcXHJcXG59XFxyXFxuXFxyXFxuLm1haW4ge1xcclxcbiAgbWFyZ2luLXRvcDogNTBweDtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcclxcbiAgcGFkZGluZzogMjBweDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uc2V0dXAtY29udGFpbmVyIHtcXHJcXG4gIGNvbG9yOiB3aGl0ZTtcXHJcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUHJlc3MgU3RhcnQgMlBcXFwiLCBjdXJzaXZlO1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgZm9udC1zaXplOiAyNXB4O1xcclxcbiAgd2lkdGg6IDQwMHB4O1xcclxcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXHJcXG4gIG1hcmdpbi1sZWZ0OiAyMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc2V0dXAtY29udGFpbmVyLnJlbW92ZSB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4uc2V0dXAtY29udGFpbmVyID4gLnJvdGF0ZS1zaGlwcyB7XFxyXFxuICBmb250LXNpemU6IDE0cHg7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXHJcXG4gIG1hcmdpbjogMjBweCAyMHB4IDE1cHggOTBweDtcXHJcXG4gIHBhZGRpbmc6IDEwcHg7XFxyXFxuICBmb250LWZhbWlseTogXFxcIlByZXNzIFN0YXJ0IDJQXFxcIiwgY3Vyc2l2ZTtcXHJcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHJnYig0MywgNDYsIDIxMik7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjYsIDI4LCA5OCk7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICBjb2xvcjogd2hpdGU7XFxyXFxufVxcclxcblxcclxcbi5yb3RhdGUtc2hpcHM6aG92ZXIge1xcclxcbiAgY29sb3I6IGdyZWVuO1xcclxcbn1cXHJcXG5cXHJcXG5mb290ZXIge1xcclxcbiAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgYm90dG9tOiAwO1xcclxcbiAgaGVpZ2h0OiA3LjUlO1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYig2LCA0MSwgNzUpO1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXHJcXG4gIGZvbnQtc2l6ZTogMjJweDtcXHJcXG4gIGNvbG9yOiB3aGl0ZTtcXHJcXG4gIHBhZGRpbmctdG9wOiAxNHB4O1xcclxcbn1cXHJcXG5cXHJcXG5mb290ZXIgPiBhID4gaW1nIHtcXHJcXG4gIG1hcmdpbi1sZWZ0OiA1cHg7XFxyXFxuXFxyXFxuICAvKiBjaGFuZ2VzIGltYWdlIGNvbG9yIHdoaXRlICovXFxyXFxuICBmaWx0ZXI6IGludmVydCgxMDAlKSBzZXBpYSgwJSkgc2F0dXJhdGUoNTEyOCUpIGh1ZS1yb3RhdGUoODRkZWcpXFxyXFxuICAgIGJyaWdodG5lc3MoMTA2JSkgY29udHJhc3QoMTQwJSk7XFxyXFxufVxcclxcblxcclxcbmZvb3RlciA+IGEgPiBpbWc6aG92ZXIge1xcclxcbiAgZmlsdGVyOiBpbnZlcnQoNDglKSBzZXBpYSgxMyUpIHNhdHVyYXRlKDMyMDclKSBodWUtcm90YXRlKDEzMGRlZylcXHJcXG4gICAgYnJpZ2h0bmVzcyg5NSUpIGNvbnRyYXN0KDgwJSk7XFxyXFxufVxcclxcblxcclxcbi5zdGFydC1idXR0b24tY29udGFpbmVyIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5zdGFydC1idXR0b24tY29udGFpbmVyLmFjdGl2ZSB7XFxyXFxuICBkaXNwbGF5OiBibG9jaztcXHJcXG4gIHdpZHRoOiA0MDBweDtcXHJcXG4gIGhlaWdodDogNDAwcHg7XFxyXFxuICBtYXJnaW4tbGVmdDogMjBweDtcXHJcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uc3RhcnQtYnV0dG9uIHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG4gIG1hcmdpbi1sZWZ0OiAxMjBweDtcXHJcXG4gIHBhZGRpbmc6IDE1cHggMjVweCAxNXB4IDI1cHg7XFxyXFxuICB0b3A6IDUwJTtcXHJcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcXHJcXG4gIGZvbnQtc2l6ZTogMjBweDtcXHJcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxyXFxuICBmb250LWZhbWlseTogXFxcIlByZXNzIFN0YXJ0IDJQXFxcIiwgY3Vyc2l2ZTtcXHJcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHJnYig0MywgNDYsIDIxMik7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjYsIDI4LCA5OCk7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICBjb2xvcjogd2hpdGU7XFxyXFxufVxcclxcblxcclxcbi5zdGFydC1idXR0b246aG92ZXIge1xcclxcbiAgY29sb3I6IGdyZWVuO1xcclxcbn1cXHJcXG5cXHJcXG4ubW9kYWwtY29udGFpbmVyIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxuICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICB0b3A6IDA7XFxyXFxuICByaWdodDogMDtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgei1pbmRleDogMTA7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNCk7XFxyXFxufVxcclxcblxcclxcbi5tb2RhbC1jb250YWluZXIuYWN0aXZlIHtcXHJcXG4gIGRpc3BsYXk6IGluaXRpYWw7XFxyXFxuICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICB0b3A6IDA7XFxyXFxuICByaWdodDogMDtcXHJcXG4gIHdpZHRoOiAxMDAlO1xcclxcbiAgaGVpZ2h0OiAxMDAlO1xcclxcbiAgei1pbmRleDogMTA7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNCk7XFxyXFxufVxcclxcblxcclxcbi5tb2RhbCB7XFxyXFxuICBtYXJnaW46IDklIGF1dG87XFxyXFxuICBwYWRkaW5nLXRvcDogMTUwcHg7XFxyXFxuICBib3JkZXI6IDFweCBzb2xpZCAjODg4O1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBoZWlnaHQ6IDY3JTtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIGZvbnQtc2l6ZTogMTAwcHg7XFxyXFxuICBmb250LWZhbWlseTogXFxcIlByZXNzIFN0YXJ0IDJQXFxcIiwgY3Vyc2l2ZTtcXHJcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHJnYig0MywgNDYsIDIxMik7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjYsIDI4LCA5OCk7XFxyXFxuICBjb2xvcjogd2hpdGU7XFxyXFxufVxcclxcblxcclxcbi5tb2RhbCA+IC5wbGF5LWFnYWluIHtcXHJcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gIHBhZGRpbmc6IDIwcHg7XFxyXFxuICB0b3A6IDYwJTtcXHJcXG4gIHJpZ2h0OiA0MyU7XFxyXFxuICBjb2xvcjogcmdiKDAsIDAsIDApO1xcclxcbiAgZm9udC1zaXplOiAyOHB4O1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxuICBmb250LWZhbWlseTogXFxcIlByZXNzIFN0YXJ0IDJQXFxcIiwgY3Vyc2l2ZTtcXHJcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHJnYig0MywgNDYsIDIxMik7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjYsIDI4LCA5OCk7XFxyXFxuICBjb2xvcjogd2hpdGU7XFxyXFxufVxcclxcblxcclxcbi5tb2RhbCA+IC5wbGF5LWFnYWluOmhvdmVyIHtcXHJcXG4gIGNvbG9yOiBncmVlbjtcXHJcXG59XFxyXFxuXFxyXFxuLm1haW4gPiAuY2hhdC1jb250YWluZXIge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLm1haW4gPiAuY2hhdC1jb250YWluZXIuYWN0aXZlIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuICBtYXJnaW4tcmlnaHQ6IC0yMDBweDtcXHJcXG4gIG1hcmdpbi1sZWZ0OiAxMDBweDtcXHJcXG4gIHdpZHRoOiBtaW4tY29udGVudDtcXHJcXG4gIGhlaWdodDogbWluLWNvbnRlbnQ7XFxyXFxuICBib3JkZXI6IDRweCBzb2xpZCBibGFjaztcXHJcXG4gIG91dGxpbmU6IDZweCBzb2xpZCBncmVlbjtcXHJcXG4gIGJhY2tncm91bmQ6IHJnYigzMSwgMzAsIDMwKTtcXHJcXG59XFxyXFxuXFxyXFxuQGtleWZyYW1lcyBtaXNzIHtcXHJcXG4gIDAlIHtcXHJcXG4gICAgYmFja2dyb3VuZDogcmdiKDMxLCAzMCwgMzApO1xcclxcbiAgfVxcclxcbiAgMjIlIHtcXHJcXG4gICAgYmFja2dyb3VuZDogcmdiKDAsIDIyNSwgMjU1KTtcXHJcXG4gIH1cXHJcXG4gIDc3JSB7XFxyXFxuICAgIGJhY2tncm91bmQ6IHJnYig4LCA0NywgMTczKTtcXHJcXG4gIH1cXHJcXG4gIDEwMCUge1xcclxcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMzEsIDMwLCAzMCk7XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbkBrZXlmcmFtZXMgaGl0IHtcXHJcXG4gIDAlIHtcXHJcXG4gICAgYmFja2dyb3VuZDogcmdiKDMxLCAzMCwgMzApO1xcclxcbiAgfVxcclxcbiAgNCUge1xcclxcbiAgICBiYWNrZ3JvdW5kOiByZWQ7XFxyXFxuICB9XFxyXFxuICAxMDAlIHtcXHJcXG4gICAgYmFja2dyb3VuZDogcmdiKDMxLCAzMCwgMzApO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5Aa2V5ZnJhbWVzIHN1bmsge1xcclxcbiAgMCUge1xcclxcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMzEsIDMwLCAzMCk7XFxyXFxuICB9XFxyXFxuICA0JSB7XFxyXFxuICAgIGJhY2tncm91bmQ6IHJnYigyNTUsIDI1NSwgMjU1KTtcXHJcXG4gIH1cXHJcXG4gIDEwMCUge1xcclxcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMjU1LCAyNTUsIDI1NSk7XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbi5tYWluID4gLmNoYXQtY29udGFpbmVyID4gaW1nIHtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIGhlaWdodDogNjAlO1xcclxcbiAgd2lkdGg6IDcwJTtcXHJcXG4gIG1hcmdpbi1sZWZ0OiA0MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY2hhdC1jb250YWluZXIgPiAuY2hhdC1ib3gge1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XFxyXFxuICBmb250LXNpemU6IDE2cHg7XFxyXFxuICBsaW5lLWhlaWdodDogMjRweDtcXHJcXG4gIHdpZHRoOiAzNjBweDtcXHJcXG4gIGhlaWdodDogMTAwcHg7XFxyXFxuICBiYWNrZ3JvdW5kOiBibGFjaztcXHJcXG4gIHBhZGRpbmc6IDI0cHg7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBjb2xvcjogcmdiKDE5LCAyNDMsIDc1KTtcXHJcXG4gIGJvcmRlcjogM3B4IHNvbGlkIHdoaXRlO1xcclxcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcclxcbiAgZm9udC1mYW1pbHk6IFxcXCJQcmVzcyBTdGFydCAyUFxcXCIsIGN1cnNpdmU7XFxyXFxufVxcclxcblxcclxcbi5jaGF0LWJveCA+IC5jaGF0LXRleHQge1xcclxcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxyXFxuICBtYXJnaW46IDAgYXV0bztcXHJcXG4gIGFuaW1hdGlvbjogcHJpbnRpbmcgMXMgc3RlcHMoNDAsIGVuZCk7XFxyXFxufVxcclxcblxcclxcbkBrZXlmcmFtZXMgcHJpbnRpbmcge1xcclxcbiAgZnJvbSB7XFxyXFxuICAgIHdpZHRoOiAwO1xcclxcbiAgfVxcclxcbiAgdG8ge1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuLmNoYXQtY29udGFpbmVyID4gLnJlc2V0LWJ1dHRvbiB7XFxyXFxuICBvcGFjaXR5OiAwLjc3O1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXHJcXG4gIGhlaWdodDogMjVweDtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIGxldHRlci1zcGFjaW5nOiAyLjJweDtcXHJcXG4gIG1hcmdpbi10b3A6IDJweDtcXHJcXG4gIGJveC1zaGFkb3c6IDBweCAwcHggNXB4IDJweDtcXHJcXG59XFxyXFxuXFxyXFxuLnJlc2V0LWJ1dHRvbjpob3ZlcixcXHJcXG4ucmVzZXQtYnV0dG9uOmZvY3VzIHtcXHJcXG4gIG9wYWNpdHk6IDE7XFxyXFxufVxcclxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvbWFpbi5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBS0E7RUFDRSxVQUFVO0VBQ1YsU0FBUztFQUNULHNCQUFzQjtBQUN4Qjs7QUFF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O0lBQ0UsOEJBQThCO0VBQ2hDO0VBQ0E7SUFDRSw4QkFBOEI7RUFDaEM7QUFDRjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixXQUFXO0VBQ1gsVUFBVTtFQUNWLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQix1QkFBdUI7RUFDdkIsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixZQUFZO0VBQ1osYUFBYTtFQUNiLGlCQUFpQjtFQUNqQixhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLHVCQUF1QjtFQUN2Qix1QkFBdUI7RUFDdkIsa0JBQWtCO0VBQ2xCLHNDQUFzQztBQUN4Qzs7QUFFQTtFQUNFLGdCQUFnQjtFQUNoQixtQkFBbUI7RUFDbkIsY0FBYztFQUNkLHFDQUFxQztBQUN2Qzs7QUFFQTtFQUNFO0lBQ0UsUUFBUTtFQUNWO0VBQ0E7SUFDRSxXQUFXO0VBQ2I7QUFDRjs7QUFFQTtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsWUFBWTtFQUNaLGVBQWU7RUFDZixxQkFBcUI7RUFDckIsZUFBZTtFQUNmLDJCQUEyQjtBQUM3Qjs7QUFFQTs7RUFFRSxVQUFVO0FBQ1pcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoXFxcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9QWxmYStTbGFiK09uZSZmYW1pbHk9QW50b24mZGlzcGxheT1zd2FwXFxcIik7XFxyXFxuQGltcG9ydCB1cmwoXFxcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UHJlc3MrU3RhcnQrMlAmZGlzcGxheT1zd2FwXFxcIik7XFxyXFxuQGltcG9ydCBcXFwiLi9ib2FyZC5jc3NcXFwiO1xcclxcbkBpbXBvcnQgXFxcIi4vc2hpcHMuY3NzXFxcIjtcXHJcXG5cXHJcXG4qIHtcXHJcXG4gIHBhZGRpbmc6IDA7XFxyXFxuICBtYXJnaW46IDA7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyOSwgODUsIDEzOCk7XFxyXFxufVxcclxcblxcclxcbmhlYWRlciB7XFxyXFxuICBwYWRkaW5nLXRvcDogNDBweDtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIGZvbnQtZmFtaWx5OiBcXFwiQWxmYSBTbGFiIE9uZVxcXCIsIGN1cnNpdmU7XFxyXFxuICBmb250LXNpemU6IDEwMHB4O1xcclxcbiAgbGV0dGVyLXNwYWNpbmc6IDNweDtcXHJcXG4gIHRleHQtc2hhZG93OiAxcHggMXB4IDAgIzI2MjYyNiwgMnB4IDJweCAwICMyNjI2MjYsIDNweCAzcHggMCAjMjYyNjI2LFxcclxcbiAgICA0cHggNHB4IDAgIzI2MjYyNiwgNXB4IDVweCAwICMyNjI2MjYsIDFweCAxcHggMCAjMjYyNjI2LFxcclxcbiAgICA2cHggMjBweCAyMHB4IHJnYmEoMCwgMCwgMCwgMSksIC0xcHggLTFweCAwIHJnYigxNDEsIDEzNSwgMTM1KTtcXHJcXG4gIGNvbG9yOiAjZjFmMWYxO1xcclxcbn1cXHJcXG5cXHJcXG4ubWFpbiB7XFxyXFxuICBtYXJnaW4tdG9wOiA1MHB4O1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxyXFxuICBwYWRkaW5nOiAyMHB4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5zZXR1cC1jb250YWluZXIge1xcclxcbiAgY29sb3I6IHdoaXRlO1xcclxcbiAgZm9udC1mYW1pbHk6IFxcXCJQcmVzcyBTdGFydCAyUFxcXCIsIGN1cnNpdmU7XFxyXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICBmb250LXNpemU6IDI1cHg7XFxyXFxuICB3aWR0aDogNDAwcHg7XFxyXFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcclxcbiAgbWFyZ2luLWxlZnQ6IDIwcHg7XFxyXFxufVxcclxcblxcclxcbi5zZXR1cC1jb250YWluZXIucmVtb3ZlIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbi5zZXR1cC1jb250YWluZXIgPiAucm90YXRlLXNoaXBzIHtcXHJcXG4gIGZvbnQtc2l6ZTogMTRweDtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcclxcbiAgbWFyZ2luOiAyMHB4IDIwcHggMTVweCA5MHB4O1xcclxcbiAgcGFkZGluZzogMTBweDtcXHJcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUHJlc3MgU3RhcnQgMlBcXFwiLCBjdXJzaXZlO1xcclxcbiAgYm9yZGVyOiAycHggc29saWQgcmdiKDQzLCA0NiwgMjEyKTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNiwgMjgsIDk4KTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIGNvbG9yOiB3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLnJvdGF0ZS1zaGlwczpob3ZlciB7XFxyXFxuICBjb2xvcjogZ3JlZW47XFxyXFxufVxcclxcblxcclxcbmZvb3RlciB7XFxyXFxuICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICBib3R0b206IDA7XFxyXFxuICBoZWlnaHQ6IDcuNSU7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDYsIDQxLCA3NSk7XFxyXFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcclxcbiAgZm9udC1zaXplOiAyMnB4O1xcclxcbiAgY29sb3I6IHdoaXRlO1xcclxcbiAgcGFkZGluZy10b3A6IDE0cHg7XFxyXFxufVxcclxcblxcclxcbmZvb3RlciA+IGEgPiBpbWcge1xcclxcbiAgbWFyZ2luLWxlZnQ6IDVweDtcXHJcXG5cXHJcXG4gIC8qIGNoYW5nZXMgaW1hZ2UgY29sb3Igd2hpdGUgKi9cXHJcXG4gIGZpbHRlcjogaW52ZXJ0KDEwMCUpIHNlcGlhKDAlKSBzYXR1cmF0ZSg1MTI4JSkgaHVlLXJvdGF0ZSg4NGRlZylcXHJcXG4gICAgYnJpZ2h0bmVzcygxMDYlKSBjb250cmFzdCgxNDAlKTtcXHJcXG59XFxyXFxuXFxyXFxuZm9vdGVyID4gYSA+IGltZzpob3ZlciB7XFxyXFxuICBmaWx0ZXI6IGludmVydCg0OCUpIHNlcGlhKDEzJSkgc2F0dXJhdGUoMzIwNyUpIGh1ZS1yb3RhdGUoMTMwZGVnKVxcclxcbiAgICBicmlnaHRuZXNzKDk1JSkgY29udHJhc3QoODAlKTtcXHJcXG59XFxyXFxuXFxyXFxuLnN0YXJ0LWJ1dHRvbi1jb250YWluZXIge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLnN0YXJ0LWJ1dHRvbi1jb250YWluZXIuYWN0aXZlIHtcXHJcXG4gIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgd2lkdGg6IDQwMHB4O1xcclxcbiAgaGVpZ2h0OiA0MDBweDtcXHJcXG4gIG1hcmdpbi1sZWZ0OiAyMHB4O1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5zdGFydC1idXR0b24ge1xcclxcbiAgcG9zaXRpb246IGFic29sdXRlO1xcclxcbiAgbWFyZ2luLWxlZnQ6IDEyMHB4O1xcclxcbiAgcGFkZGluZzogMTVweCAyNXB4IDE1cHggMjVweDtcXHJcXG4gIHRvcDogNTAlO1xcclxcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xcclxcbiAgZm9udC1zaXplOiAyMHB4O1xcclxcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXHJcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUHJlc3MgU3RhcnQgMlBcXFwiLCBjdXJzaXZlO1xcclxcbiAgYm9yZGVyOiAycHggc29saWQgcmdiKDQzLCA0NiwgMjEyKTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNiwgMjgsIDk4KTtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIGNvbG9yOiB3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLnN0YXJ0LWJ1dHRvbjpob3ZlciB7XFxyXFxuICBjb2xvcjogZ3JlZW47XFxyXFxufVxcclxcblxcclxcbi5tb2RhbC1jb250YWluZXIge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gIHRvcDogMDtcXHJcXG4gIHJpZ2h0OiAwO1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxuICB6LWluZGV4OiAxMDtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40KTtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsLWNvbnRhaW5lci5hY3RpdmUge1xcclxcbiAgZGlzcGxheTogaW5pdGlhbDtcXHJcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gIHRvcDogMDtcXHJcXG4gIHJpZ2h0OiAwO1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxuICB6LWluZGV4OiAxMDtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC40KTtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsIHtcXHJcXG4gIG1hcmdpbjogOSUgYXV0bztcXHJcXG4gIHBhZGRpbmctdG9wOiAxNTBweDtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkICM4ODg7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGhlaWdodDogNjclO1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgZm9udC1zaXplOiAxMDBweDtcXHJcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUHJlc3MgU3RhcnQgMlBcXFwiLCBjdXJzaXZlO1xcclxcbiAgYm9yZGVyOiAycHggc29saWQgcmdiKDQzLCA0NiwgMjEyKTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNiwgMjgsIDk4KTtcXHJcXG4gIGNvbG9yOiB3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsID4gLnBsYXktYWdhaW4ge1xcclxcbiAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgcGFkZGluZzogMjBweDtcXHJcXG4gIHRvcDogNjAlO1xcclxcbiAgcmlnaHQ6IDQzJTtcXHJcXG4gIGNvbG9yOiByZ2IoMCwgMCwgMCk7XFxyXFxuICBmb250LXNpemU6IDI4cHg7XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIGN1cnNvcjogcG9pbnRlcjtcXHJcXG4gIGZvbnQtZmFtaWx5OiBcXFwiUHJlc3MgU3RhcnQgMlBcXFwiLCBjdXJzaXZlO1xcclxcbiAgYm9yZGVyOiAycHggc29saWQgcmdiKDQzLCA0NiwgMjEyKTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNiwgMjgsIDk4KTtcXHJcXG4gIGNvbG9yOiB3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLm1vZGFsID4gLnBsYXktYWdhaW46aG92ZXIge1xcclxcbiAgY29sb3I6IGdyZWVuO1xcclxcbn1cXHJcXG5cXHJcXG4ubWFpbiA+IC5jaGF0LWNvbnRhaW5lciB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4ubWFpbiA+IC5jaGF0LWNvbnRhaW5lci5hY3RpdmUge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIG1hcmdpbi1yaWdodDogLTIwMHB4O1xcclxcbiAgbWFyZ2luLWxlZnQ6IDEwMHB4O1xcclxcbiAgd2lkdGg6IG1pbi1jb250ZW50O1xcclxcbiAgaGVpZ2h0OiBtaW4tY29udGVudDtcXHJcXG4gIGJvcmRlcjogNHB4IHNvbGlkIGJsYWNrO1xcclxcbiAgb3V0bGluZTogNnB4IHNvbGlkIGdyZWVuO1xcclxcbiAgYmFja2dyb3VuZDogcmdiKDMxLCAzMCwgMzApO1xcclxcbn1cXHJcXG5cXHJcXG5Aa2V5ZnJhbWVzIG1pc3Mge1xcclxcbiAgMCUge1xcclxcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMzEsIDMwLCAzMCk7XFxyXFxuICB9XFxyXFxuICAyMiUge1xcclxcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMCwgMjI1LCAyNTUpO1xcclxcbiAgfVxcclxcbiAgNzclIHtcXHJcXG4gICAgYmFja2dyb3VuZDogcmdiKDgsIDQ3LCAxNzMpO1xcclxcbiAgfVxcclxcbiAgMTAwJSB7XFxyXFxuICAgIGJhY2tncm91bmQ6IHJnYigzMSwgMzAsIDMwKTtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuQGtleWZyYW1lcyBoaXQge1xcclxcbiAgMCUge1xcclxcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMzEsIDMwLCAzMCk7XFxyXFxuICB9XFxyXFxuICA0JSB7XFxyXFxuICAgIGJhY2tncm91bmQ6IHJlZDtcXHJcXG4gIH1cXHJcXG4gIDEwMCUge1xcclxcbiAgICBiYWNrZ3JvdW5kOiByZ2IoMzEsIDMwLCAzMCk7XFxyXFxuICB9XFxyXFxufVxcclxcblxcclxcbkBrZXlmcmFtZXMgc3VuayB7XFxyXFxuICAwJSB7XFxyXFxuICAgIGJhY2tncm91bmQ6IHJnYigzMSwgMzAsIDMwKTtcXHJcXG4gIH1cXHJcXG4gIDQlIHtcXHJcXG4gICAgYmFja2dyb3VuZDogcmdiKDI1NSwgMjU1LCAyNTUpO1xcclxcbiAgfVxcclxcbiAgMTAwJSB7XFxyXFxuICAgIGJhY2tncm91bmQ6IHJnYigyNTUsIDI1NSwgMjU1KTtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuLm1haW4gPiAuY2hhdC1jb250YWluZXIgPiBpbWcge1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgaGVpZ2h0OiA2MCU7XFxyXFxuICB3aWR0aDogNzAlO1xcclxcbiAgbWFyZ2luLWxlZnQ6IDQwcHg7XFxyXFxufVxcclxcblxcclxcbi5jaGF0LWNvbnRhaW5lciA+IC5jaGF0LWJveCB7XFxyXFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxyXFxuICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcXHJcXG4gIGZvbnQtc2l6ZTogMTZweDtcXHJcXG4gIGxpbmUtaGVpZ2h0OiAyNHB4O1xcclxcbiAgd2lkdGg6IDM2MHB4O1xcclxcbiAgaGVpZ2h0OiAxMDBweDtcXHJcXG4gIGJhY2tncm91bmQ6IGJsYWNrO1xcclxcbiAgcGFkZGluZzogMjRweDtcXHJcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gIGNvbG9yOiByZ2IoMTksIDI0MywgNzUpO1xcclxcbiAgYm9yZGVyOiAzcHggc29saWQgd2hpdGU7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICBmb250LWZhbWlseTogXFxcIlByZXNzIFN0YXJ0IDJQXFxcIiwgY3Vyc2l2ZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNoYXQtYm94ID4gLmNoYXQtdGV4dCB7XFxyXFxuICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcXHJcXG4gIG1hcmdpbjogMCBhdXRvO1xcclxcbiAgYW5pbWF0aW9uOiBwcmludGluZyAxcyBzdGVwcyg0MCwgZW5kKTtcXHJcXG59XFxyXFxuXFxyXFxuQGtleWZyYW1lcyBwcmludGluZyB7XFxyXFxuICBmcm9tIHtcXHJcXG4gICAgd2lkdGg6IDA7XFxyXFxuICB9XFxyXFxuICB0byB7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG4uY2hhdC1jb250YWluZXIgPiAucmVzZXQtYnV0dG9uIHtcXHJcXG4gIG9wYWNpdHk6IDAuNzc7XFxyXFxuICBmb250LXdlaWdodDogYm9sZGVyO1xcclxcbiAgaGVpZ2h0OiAyNXB4O1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbiAgbGV0dGVyLXNwYWNpbmc6IDIuMnB4O1xcclxcbiAgbWFyZ2luLXRvcDogMnB4O1xcclxcbiAgYm94LXNoYWRvdzogMHB4IDBweCA1cHggMnB4O1xcclxcbn1cXHJcXG5cXHJcXG4ucmVzZXQtYnV0dG9uOmhvdmVyLFxcclxcbi5yZXNldC1idXR0b246Zm9jdXMge1xcclxcbiAgb3BhY2l0eTogMTtcXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLnNoaXAtc2V0dXAtY29udGFpbmVyIHtcXHJcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBtYXJnaW46IDIwcHggMHB4IDBweCAzNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc2hpcCB7XFxyXFxuICBwYWRkaW5nOiA2cHg7XFxyXFxufVxcclxcblxcclxcbi5ob3Jpem9udGFsIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxufVxcclxcblxcclxcbi5zaGlwLXNldHVwLWNvbnRhaW5lci5ob3Jpem9udGFsIHtcXHJcXG4gIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XFxyXFxuICBmbGV4LXdyYXA6IHdyYXA7XFxyXFxufVxcclxcblxcclxcbi5DYXJyaWVyLWNvbnRhaW5lciB7XFxyXFxuICB3aWR0aDogbWluLWNvbnRlbnQ7XFxyXFxuICBoZWlnaHQ6IG1pbi1jb250ZW50O1xcclxcbn1cXHJcXG5cXHJcXG4uQ2Fycmllci1jb250YWluZXIgPiAuc2hpcC1jZWxsIHtcXHJcXG4gIHdpZHRoOiAzLjFyZW07XFxyXFxuICBoZWlnaHQ6IDMuMXJlbTtcXHJcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHJnYig0MywgNDYsIDIxMik7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjYsIDI4LCA5OCk7XFxyXFxufVxcclxcblxcclxcbi5CYXR0bGVzaGlwLWNvbnRhaW5lciB7XFxyXFxuICB3aWR0aDogbWluLWNvbnRlbnQ7XFxyXFxuICBoZWlnaHQ6IG1pbi1jb250ZW50O1xcclxcbn1cXHJcXG5cXHJcXG4uQmF0dGxlc2hpcC1jb250YWluZXIgPiAuc2hpcC1jZWxsIHtcXHJcXG4gIHdpZHRoOiAzLjFyZW07XFxyXFxuICBoZWlnaHQ6IDMuMXJlbTtcXHJcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHJnYig0MywgNDYsIDIxMik7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjYsIDI4LCA5OCk7XFxyXFxufVxcclxcblxcclxcbi5DcnVpc2VyLWNvbnRhaW5lciB7XFxyXFxuICB3aWR0aDogbWluLWNvbnRlbnQ7XFxyXFxuICBoZWlnaHQ6IG1pbi1jb250ZW50O1xcclxcbn1cXHJcXG5cXHJcXG4uQ3J1aXNlci1jb250YWluZXIgPiAuc2hpcC1jZWxsIHtcXHJcXG4gIHdpZHRoOiAzLjFyZW07XFxyXFxuICBoZWlnaHQ6IDMuMXJlbTtcXHJcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHJnYig0MywgNDYsIDIxMik7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjYsIDI4LCA5OCk7XFxyXFxufVxcclxcblxcclxcbi5TdWJtYXJpbmUtY29udGFpbmVyIHtcXHJcXG4gIHdpZHRoOiBtaW4tY29udGVudDtcXHJcXG4gIGhlaWdodDogbWluLWNvbnRlbnQ7XFxyXFxufVxcclxcblxcclxcbi5TdWJtYXJpbmUtY29udGFpbmVyID4gLnNoaXAtY2VsbCB7XFxyXFxuICB3aWR0aDogMy4xcmVtO1xcclxcbiAgaGVpZ2h0OiAzLjFyZW07XFxyXFxuICBib3JkZXI6IDJweCBzb2xpZCByZ2IoNDMsIDQ2LCAyMTIpO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI2LCAyOCwgOTgpO1xcclxcbn1cXHJcXG5cXHJcXG4uRGVzdHJveWVyLWNvbnRhaW5lciB7XFxyXFxuICB3aWR0aDogbWluLWNvbnRlbnQ7XFxyXFxuICBoZWlnaHQ6IG1pbi1jb250ZW50O1xcclxcbn1cXHJcXG5cXHJcXG4uRGVzdHJveWVyLWNvbnRhaW5lciA+IC5zaGlwLWNlbGwge1xcclxcbiAgd2lkdGg6IDMuMXJlbTtcXHJcXG4gIGhlaWdodDogMy4xcmVtO1xcclxcbiAgYm9yZGVyOiAycHggc29saWQgcmdiKDQzLCA0NiwgMjEyKTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNiwgMjgsIDk4KTtcXHJcXG59XFxyXFxuXFxyXFxuLyogY2xhc3NlcyBhZGRlZCB0byB0aGUgZ3JpZCBjZWxscyB3aGVyZSBzaGlwcyBoYXZlIGJlZW4gcGxhY2VkICovXFxyXFxuLkNhcnJpZXIge1xcclxcbiAgYm9yZGVyOiAycHggc29saWQgcmdiKDQzLCA0NiwgMjEyKTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNiwgMjgsIDk4KTtcXHJcXG59XFxyXFxuXFxyXFxuLkJhdHRsZXNoaXAge1xcclxcbiAgYm9yZGVyOiAycHggc29saWQgcmdiKDQzLCA0NiwgMjEyKTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNiwgMjgsIDk4KTtcXHJcXG59XFxyXFxuXFxyXFxuLkNydWlzZXIge1xcclxcbiAgYm9yZGVyOiAycHggc29saWQgcmdiKDQzLCA0NiwgMjEyKTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNiwgMjgsIDk4KTtcXHJcXG59XFxyXFxuXFxyXFxuLlN1Ym1hcmluZSB7XFxyXFxuICBib3JkZXI6IDJweCBzb2xpZCByZ2IoNDMsIDQ2LCAyMTIpO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI2LCAyOCwgOTgpO1xcclxcbn1cXHJcXG5cXHJcXG4uRGVzdHJveWVyIHtcXHJcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHJnYig0MywgNDYsIDIxMik7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjYsIDI4LCA5OCk7XFxyXFxufVxcclxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvc2hpcHMuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0UsZUFBZTtFQUNmLGFBQWE7RUFDYix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxjQUFjO0VBQ2QsNkJBQTZCO0VBQzdCLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGNBQWM7RUFDZCxrQ0FBa0M7RUFDbEMsaUNBQWlDO0FBQ25DOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixjQUFjO0VBQ2Qsa0NBQWtDO0VBQ2xDLGlDQUFpQztBQUNuQzs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsY0FBYztFQUNkLGtDQUFrQztFQUNsQyxpQ0FBaUM7QUFDbkM7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLGNBQWM7RUFDZCxrQ0FBa0M7RUFDbEMsaUNBQWlDO0FBQ25DOztBQUVBO0VBQ0Usa0JBQWtCO0VBQ2xCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixjQUFjO0VBQ2Qsa0NBQWtDO0VBQ2xDLGlDQUFpQztBQUNuQzs7QUFFQSxpRUFBaUU7QUFDakU7RUFDRSxrQ0FBa0M7RUFDbEMsaUNBQWlDO0FBQ25DOztBQUVBO0VBQ0Usa0NBQWtDO0VBQ2xDLGlDQUFpQztBQUNuQzs7QUFFQTtFQUNFLGtDQUFrQztFQUNsQyxpQ0FBaUM7QUFDbkM7O0FBRUE7RUFDRSxrQ0FBa0M7RUFDbEMsaUNBQWlDO0FBQ25DOztBQUVBO0VBQ0Usa0NBQWtDO0VBQ2xDLGlDQUFpQztBQUNuQ1wiLFwic291cmNlc0NvbnRlbnRcIjpbXCIuc2hpcC1zZXR1cC1jb250YWluZXIge1xcclxcbiAgcG9zaXRpb246IGZpeGVkO1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIG1hcmdpbjogMjBweCAwcHggMHB4IDM1cHg7XFxyXFxufVxcclxcblxcclxcbi5zaGlwIHtcXHJcXG4gIHBhZGRpbmc6IDZweDtcXHJcXG59XFxyXFxuXFxyXFxuLmhvcml6b250YWwge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG59XFxyXFxuXFxyXFxuLnNoaXAtc2V0dXAtY29udGFpbmVyLmhvcml6b250YWwge1xcclxcbiAgZGlzcGxheTogYmxvY2s7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXHJcXG4gIGZsZXgtd3JhcDogd3JhcDtcXHJcXG59XFxyXFxuXFxyXFxuLkNhcnJpZXItY29udGFpbmVyIHtcXHJcXG4gIHdpZHRoOiBtaW4tY29udGVudDtcXHJcXG4gIGhlaWdodDogbWluLWNvbnRlbnQ7XFxyXFxufVxcclxcblxcclxcbi5DYXJyaWVyLWNvbnRhaW5lciA+IC5zaGlwLWNlbGwge1xcclxcbiAgd2lkdGg6IDMuMXJlbTtcXHJcXG4gIGhlaWdodDogMy4xcmVtO1xcclxcbiAgYm9yZGVyOiAycHggc29saWQgcmdiKDQzLCA0NiwgMjEyKTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNiwgMjgsIDk4KTtcXHJcXG59XFxyXFxuXFxyXFxuLkJhdHRsZXNoaXAtY29udGFpbmVyIHtcXHJcXG4gIHdpZHRoOiBtaW4tY29udGVudDtcXHJcXG4gIGhlaWdodDogbWluLWNvbnRlbnQ7XFxyXFxufVxcclxcblxcclxcbi5CYXR0bGVzaGlwLWNvbnRhaW5lciA+IC5zaGlwLWNlbGwge1xcclxcbiAgd2lkdGg6IDMuMXJlbTtcXHJcXG4gIGhlaWdodDogMy4xcmVtO1xcclxcbiAgYm9yZGVyOiAycHggc29saWQgcmdiKDQzLCA0NiwgMjEyKTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNiwgMjgsIDk4KTtcXHJcXG59XFxyXFxuXFxyXFxuLkNydWlzZXItY29udGFpbmVyIHtcXHJcXG4gIHdpZHRoOiBtaW4tY29udGVudDtcXHJcXG4gIGhlaWdodDogbWluLWNvbnRlbnQ7XFxyXFxufVxcclxcblxcclxcbi5DcnVpc2VyLWNvbnRhaW5lciA+IC5zaGlwLWNlbGwge1xcclxcbiAgd2lkdGg6IDMuMXJlbTtcXHJcXG4gIGhlaWdodDogMy4xcmVtO1xcclxcbiAgYm9yZGVyOiAycHggc29saWQgcmdiKDQzLCA0NiwgMjEyKTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNiwgMjgsIDk4KTtcXHJcXG59XFxyXFxuXFxyXFxuLlN1Ym1hcmluZS1jb250YWluZXIge1xcclxcbiAgd2lkdGg6IG1pbi1jb250ZW50O1xcclxcbiAgaGVpZ2h0OiBtaW4tY29udGVudDtcXHJcXG59XFxyXFxuXFxyXFxuLlN1Ym1hcmluZS1jb250YWluZXIgPiAuc2hpcC1jZWxsIHtcXHJcXG4gIHdpZHRoOiAzLjFyZW07XFxyXFxuICBoZWlnaHQ6IDMuMXJlbTtcXHJcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHJnYig0MywgNDYsIDIxMik7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjYsIDI4LCA5OCk7XFxyXFxufVxcclxcblxcclxcbi5EZXN0cm95ZXItY29udGFpbmVyIHtcXHJcXG4gIHdpZHRoOiBtaW4tY29udGVudDtcXHJcXG4gIGhlaWdodDogbWluLWNvbnRlbnQ7XFxyXFxufVxcclxcblxcclxcbi5EZXN0cm95ZXItY29udGFpbmVyID4gLnNoaXAtY2VsbCB7XFxyXFxuICB3aWR0aDogMy4xcmVtO1xcclxcbiAgaGVpZ2h0OiAzLjFyZW07XFxyXFxuICBib3JkZXI6IDJweCBzb2xpZCByZ2IoNDMsIDQ2LCAyMTIpO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI2LCAyOCwgOTgpO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBjbGFzc2VzIGFkZGVkIHRvIHRoZSBncmlkIGNlbGxzIHdoZXJlIHNoaXBzIGhhdmUgYmVlbiBwbGFjZWQgKi9cXHJcXG4uQ2FycmllciB7XFxyXFxuICBib3JkZXI6IDJweCBzb2xpZCByZ2IoNDMsIDQ2LCAyMTIpO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI2LCAyOCwgOTgpO1xcclxcbn1cXHJcXG5cXHJcXG4uQmF0dGxlc2hpcCB7XFxyXFxuICBib3JkZXI6IDJweCBzb2xpZCByZ2IoNDMsIDQ2LCAyMTIpO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI2LCAyOCwgOTgpO1xcclxcbn1cXHJcXG5cXHJcXG4uQ3J1aXNlciB7XFxyXFxuICBib3JkZXI6IDJweCBzb2xpZCByZ2IoNDMsIDQ2LCAyMTIpO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI2LCAyOCwgOTgpO1xcclxcbn1cXHJcXG5cXHJcXG4uU3VibWFyaW5lIHtcXHJcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHJnYig0MywgNDYsIDIxMik7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjYsIDI4LCA5OCk7XFxyXFxufVxcclxcblxcclxcbi5EZXN0cm95ZXIge1xcclxcbiAgYm9yZGVyOiAycHggc29saWQgcmdiKDQzLCA0NiwgMjEyKTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNiwgMjgsIDk4KTtcXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IHRoaXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNbX2ldWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2kyID0gMDsgX2kyIDwgbW9kdWxlcy5sZW5ndGg7IF9pMisrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19pMl0pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21haW4uY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tYWluLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtcclxuICBkb21FbGVtZW50cyxcclxuICB0b2dnbGVIb3Jpem9udGFsQ2xhc3MsXHJcbiAgc3RhcnRET01NYW5pcHVsYXRpb24sXHJcbn0gZnJvbSBcIi4vbW9kdWxlcy9kaXNwbGF5Q29udHJvbGxlci9kb21FbGVtZW50c1wiO1xyXG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9tb2R1bGVzL2dhbWVMb29wXCI7XHJcbmltcG9ydCBcIi4vc3R5bGVzL21haW4uY3NzXCI7XHJcblxyXG5jb25zdCBnYW1lID0gR2FtZSgpO1xyXG5cclxuZ2FtZS5yZW5kZXJHYW1lYm9hcmRzKCk7XHJcblxyXG5nYW1lLnJlbmRlclNoaXBzKCk7XHJcblxyXG5nYW1lLmdyaWRMaXN0ZW5lcigpO1xyXG5cclxuLy9yb3RhdGUgYnV0dG9uIGV2ZW50IGxpc3RlbmVyXHJcbmRvbUVsZW1lbnRzLnJvdGF0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gIHRvZ2dsZUhvcml6b250YWxDbGFzcygpO1xyXG4gIGdhbWUuZmxlZXRDaGFuZ2VEaXJlY3Rpb24oKTtcclxufSk7XHJcblxyXG4vLyBzdGFydCBidXR0b24gbGlzdGVuZXJcclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydC1idXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICBnYW1lLnJlc2V0RXZlbnQoKTtcclxuICBnYW1lLnN0YXJ0KCk7XHJcbiAgc3RhcnRET01NYW5pcHVsYXRpb24oKTtcclxufSk7XHJcblxyXG4vLyByZXBsYXkgYnV0dG9uIGxpc3RlbmVyXHJcbmRvbUVsZW1lbnRzLnBsYXlBZ2Fpbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gIGdhbWUucmVzdGFydEdhbWUoKTtcclxuICBnYW1lLnJlc2V0RXZlbnQoKTtcclxufSk7XHJcbiJdLCJuYW1lcyI6WyJkb21FbGVtZW50cyIsInBsYXllckdhbWVib2FyZCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbXB1dGVyR2FtZWJvYXJkIiwic2V0dXBDb250YWluZXIiLCJzaGlwU2V0dXBDb250YWluZXIiLCJyb3RhdGVCdXR0b24iLCJzaGlwQ2VsbCIsInN0YXJ0QnV0dG9uIiwic3RhcnRCdXR0b25Db250YWluZXIiLCJtb2RhbENvbnRhaW5lciIsIm1vZGFsIiwicGxheUFnYWluIiwid2lubmVyIiwiY3Jvc3NoYWlyWCIsImNyb3NzaGFpclkiLCJjaGF0Q29udGFpbmVyIiwiY2hhdEJveCIsImNoYXRUZXh0IiwicmVzZXRCdXR0b24iLCJzdGFydERPTU1hbmlwdWxhdGlvbiIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsInRvZ2dsZSIsInRleHRDb250ZW50IiwicmVzdGFydERPTU1hbmlwdWxhdGlvbiIsInRvZ2dsZUhvcml6b250YWxDbGFzcyIsImNoaWxkTm9kZXMiLCJmb3JFYWNoIiwibm9kZSIsInJlc2V0QW5pbWF0aW9uIiwidGV4dCIsImNvbnRhaW5lciIsInN0eWxlIiwiYW5pbWF0aW9uIiwib2Zmc2V0SGVpZ2h0IiwiY2hhdEJveENvbnRyb2xsZXIiLCJsb2NhdGlvbiIsInBsYXllciIsInBsYXllckhpdHMiLCJwbGF5ZXJNaXNzZWQiLCJjb21wdXRlclNoaXBTdW5rIiwiY29tcHV0ZXJIaXRzIiwiY29tcHV0ZXJNaXNzZWQiLCJwbGF5ZXJTaGlwU3VuayIsImlzU2hpcFN1bmsiLCJ0b2dnbGVDbGlja0Jsb2NrZXIiLCJtYXRjaFNoaXAiLCJyZW5kZXJDb250cm9sbGVyIiwiRHJhZyIsInBsYXllckJvYXJkIiwicGxheWVyRmxlZXQiLCJkcmFnRXZlbnRMaXN0ZW5lcnMiLCJzaGlwcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjZWxscyIsInNoaXAiLCJhZGRFdmVudExpc3RlbmVyIiwiZHJhZ1N0YXJ0IiwiY2VsbCIsImRyYWdPdmVyIiwiZHJhZ0VudGVyIiwiZHJhZ0Ryb3AiLCJkcmFnIiwiZSIsInNlbGVjdGVkU2hpcE5hbWVXaXRoSW5kZXgiLCJ0YXJnZXQiLCJ0cmFuc2Zvcm0iLCJsZWZ0IiwiY2xpZW50WCIsInRvcCIsImNsaWVudFkiLCJkcmFnZ2VkU2hpcCIsInByZXZlbnREZWZhdWx0IiwibmFtZSIsImRhdGFzZXQiLCJpbmRleCIsIk51bWJlciIsIngiLCJ5IiwiZGlyZWN0aW9uIiwicGxhY2VkIiwicGxhY2VTaGlwcyIsInJlbmRlckJvYXJkIiwicGxhY2VkU2hpcHMiLCJsZW5ndGgiLCJjaGVja0ZvclNoaXAiLCJib2FyZCIsImNoZWNrRm9yQXR0YWNrIiwiY3JlYXRlQ2VsbCIsImRvbSIsInR5cGUiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmQiLCJib2FyZFJlY2lldmVkIiwiZ2V0Qm9hcmQiLCJyb3ciLCJpbmRleE9mIiwiY29sIiwicmVuZGVyU2hpcCIsInNoaXBEaXYiLCJpIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwicmVuZGVyRmxlZXQiLCJTaGlwIiwic2hpcEluZm8iLCJjcmVhdGVTaGlwcyIsInNoaXBBcnJheSIsInB1c2giLCJmbGVldCIsIkNhcnJpZXIiLCJCYXR0bGVzaGlwIiwiQ3J1aXNlciIsIlN1Ym1hcmluZSIsIkRlc3Ryb3llciIsIm1hdGNoZWRTaGlwIiwiR2FtZWJvYXJkIiwiUGxheWVyIiwiR2FtZSIsImNwdUZsZWV0IiwiY29tcHV0ZXIiLCJjb21wdXRlckJvYXJkIiwiZ2FtZU92ZXIiLCJjaGVja0dhbWVPdmVyIiwiaW5uZXJUZXh0IiwiYm9hcmRBdHRhY2siLCJjb21wQXR0YWNrIiwicmFuZCIsIk1hdGgiLCJyb3VuZCIsInJhbmRvbSIsInNldFRpbWVvdXQiLCJyYW5kb21BdHRhY2siLCJib3JkZXIiLCJwbGFjZUF0dGFjayIsImdyaWRMaXN0ZW5lciIsImdyaWQiLCJvbmNlIiwiZmxlZXRDaGFuZ2VEaXJlY3Rpb24iLCJjaGFuZ2VEaXJlY3Rpb24iLCJyZW5kZXJHYW1lYm9hcmRzIiwicGxhY2VTaW5nbGUiLCJhdXRvUGxhY2VTaGlwcyIsInN0YXJ0IiwicmVuZGVyU2hpcHMiLCJyZXN0YXJ0R2FtZSIsInJlc2V0RXZlbnQiLCJhdHRhY2tMb2ciLCJBcnJheSIsImZpbGwiLCJtYXAiLCJjaGVja1Bvc3NpYmxlUGxhY2VtZW50IiwibnVtIiwicmVjaWV2ZUF0dGFjayIsImhpdCIsIm1pc3MiLCJldmVyeSIsImlzU3VuayIsInR1cm4iLCJzd2l0Y2hUdXJuIiwic2hpcE5hbWUiLCJzaXplIiwiaGl0cyIsInNoaWZ0IiwidmFsIiwiZ2FtZSJdLCJzb3VyY2VSb290IjoiIn0=