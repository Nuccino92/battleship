import { domElements } from "./displayController/domElements";
import { ships } from "./fleet";
import renderController from "./displayController/renderController";
import Gameboard from "./gameboard";
import Player from "./player";
import Drag from "./displayController/drag";

function Game() {
  const fleet = ships;

  const player = Player("human");
  const computer = Player("computer");

  const playerBoard = new Gameboard();
  const computerBoard = new Gameboard();

  function boardAttack(e) {
    const cell = e.target;
    if (cell.id !== "computer") return;
    const { x } = cell.dataset;
    const { y } = cell.dataset;

    player.placeAttack(x, y, computerBoard);

    if (computerBoard.board[x][y] === "hit") {
      e.target.classList.add("hit");
    }

    if (computerBoard.board[x][y] === "miss") {
      e.target.classList.add("miss");
    }

    computer.randomAttack(playerBoard);

    renderController().renderBoard(
      domElements.playerGameboard,
      playerBoard,
      computer.player
    );

    console.log(playerBoard.placedShips);
    console.log(computerBoard.placedShips);

    //checking if games over
    // gameOver(playerBoard, computerBoard);

    if (playerBoard.checkGameOver() === true) {
      // domElements.modalContainer.classList.add("active");
      domElements.modalContainer.textContent = "You Lost";
      return console.log("lose");
    }
    if (computerBoard.checkGameOver() === true) {
      // domElements.modalContainer.classList.add("active");
      domElements.modalContainer.textContent = "You Win!";
      return console.log("win");
    }
  }

  function fleetChangeDirection() {
    fleet.forEach((ship) => {
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
    ships.forEach((ship) => {
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
    renderController().renderFleet(fleet);
    Drag(playerBoard).dragEventListeners();
  }

  function restartGame() {
    domElements.setupContainer.classList.remove("remove");
    domElements.computerGameboard.classList.remove("active");
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
