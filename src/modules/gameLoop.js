import { domElements } from "./displayController/domElements";
import { createShips } from "./fleet";
import renderController from "./displayController/renderController";
import Gameboard from "./gameboard";
import Player from "./player";
import Drag from "./displayController/drag";

function Game() {
  let playerFleet = createShips();
  let cpuFleet = createShips();

  const player = Player("human");
  const computer = Player("computer");

  let playerBoard = new Gameboard();
  let computerBoard = new Gameboard();

  function gameOver(playerBoard, computerBoard) {
    if (playerBoard.checkGameOver() === true) {
      domElements.modalContainer.classList.add("active");
      domElements.winner.innerText = "You Lost";
    }
    if (computerBoard.checkGameOver() === true) {
      domElements.modalContainer.classList.add("active");
      domElements.winner.innerText = "You Win!";
    }
  }

  function boardAttack(e) {
    const cell = e.target;

    if (cell.id !== "computer") return;
    const { x } = cell.dataset;
    const { y } = cell.dataset;

    function compAttack() {
      const rand = Math.round(Math.random() * (2000 - 500)) + 500;
      setTimeout(() => {
        computer.randomAttack(playerBoard);
        renderController().renderBoard(
          domElements.playerGameboard,
          playerBoard,
          computer.player
        );

        // checking if games over
        gameOver(playerBoard, computerBoard);
        domElements.blocker.classList.remove("active");
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
      gameOver(playerBoard, computerBoard);
      domElements.blocker.classList.add("active");
      compAttack();
    }
  }

  function fleetChangeDirection() {
    playerFleet.forEach((ship) => {
      ship.changeDirection();
    });
  }

  function renderGameboards() {
    renderController().renderBoard(
      domElements.playerGameboard,
      playerBoard,
      player.player
    );
    renderController().renderBoard(
      domElements.computerGameboard,
      computerBoard,
      computer.player
    );
  }

  function placeSingle(ship) {
    const x = Math.round(Math.random() * 9);
    const y = Math.round(Math.random() * 9);
    const changeDirection = Math.random() > 0.5;
    if (changeDirection) ship.changeDirection();
    const placed = computerBoard.placeShips(ship, x, y);
    if (!placed) placeSingle(ship);
  }

  function autoPlaceShips() {
    cpuFleet.forEach((ship) => {
      const x = Math.round(Math.random() * 9);
      const y = Math.round(Math.random() * 9);
      const changeDirection = Math.random() > 0.5;
      if (changeDirection) ship.changeDirection();
      const placed = computerBoard.placeShips(ship, x, y);
      if (!placed) placeSingle(ship);
    });
  }

  function start() {
    autoPlaceShips();
  }

  function renderShips() {
    renderController().renderFleet(playerFleet);
    Drag(playerBoard, playerFleet).dragEventListeners();
  }

  function restartGame() {
    domElements.setupContainer.classList.remove("remove");
    domElements.computerGameboard.classList.remove("active");
    playerFleet = createShips();
    cpuFleet = createShips();
    playerBoard = new Gameboard();
    computerBoard = new Gameboard();
    renderGameboards();
    renderShips();

    const grid = document.querySelectorAll(".grid-cell");

    grid.forEach((cell) =>
      cell.addEventListener(
        "click",
        (e) => {
          boardAttack(e);
        },
        { once: true }
      )
    );
  }

  return {
    renderGameboards,
    renderShips,
    boardAttack,
    fleetChangeDirection,
    start,
    restartGame,
  };
}

export default Game;
