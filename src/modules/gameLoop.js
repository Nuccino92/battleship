import { domElements } from "./displayController/domElements";
import renderController from "./displayController/renderController";
import fleet from "./fleet";
import Gameboard from "./gameboard";
import Player from "./player";

function Game() {
  const player = Player("human");
  const computer = Player("computer");

  const playerBoard = new Gameboard();
  const computerBoard = new Gameboard();

  const cpuBattleship = fleet().Battleship();
  const playerBattleship = fleet().Battleship();
  cpuBattleship.changeDirection();

  playerBoard.placeShips(playerBattleship, 0, 0);
  computerBoard.placeShips(cpuBattleship, 0, 0);

  function startGame() {
    //starts game
  }
  function playAgain() {
    //restarts the game
  }
  function restartGame() {
    // restarts the match without setup
  }

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
    renderController().renderFleet(playerBoard.board);
    renderController().renderFleet(computerBoard.board);
  }

  return { renderGameboards, renderShips, boardAttack };
}
export default Game;
