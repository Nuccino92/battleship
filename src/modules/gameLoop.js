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

  const drag = new Drag(playerBoard);

  function gameOver(playerBoard, computerBoard) {
    if (playerBoard.checkGameOver()) {
      console.log("COMPUTER WINS");
    }
    if (computerBoard.checkGameOver()) {
      console.log("PLAYER WINS");
    }
  }

  function boardAttack(e) {
    const cell = e.target;
    if (cell.id !== "computer") return;
    const { x } = cell.dataset;
    const { y } = cell.dataset;

    player.placeAttack(x, y, computerBoard);
    computer.randomAttack(playerBoard);

    //checking if games over
    gameOver(playerBoard, computerBoard);
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

  function renderShips() {
    renderController().renderFleet(fleet);
    Drag(playerBoard);
    console.log(playerBoard);
  }

  // function computerPlaceShips() {
  //fleet
  // }

  return {
    renderGameboards,
    renderShips,
    boardAttack,
    fleetChangeDirection,
  };
}
export default Game;
