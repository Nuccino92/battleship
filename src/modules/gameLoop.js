import { domElements } from "./displayController/domElements";
import renderController from "./displayController/renderController";
import Gameboard from "./gameboard";
import Player from "./player";

function Game() {
  const player = Player("human");
  const computer = Player("computer");

  const playerBoard = new Gameboard();
  const computerBoard = new Gameboard();

  function startGame() {
    //starts game
  }
  function playAgain() {
    //restarts the game
  }
  function restartGame() {
    // restarts the match without setup
  }
  function renderGameboards() {
    renderController().renderBoard(domElements.playerGameboard, playerBoard);
    renderController().renderBoard(
      domElements.computerGameboard,
      computerBoard
    );
  }
  function renderShips() {
    //renderController()
  }
  return { renderGameboards, renderShips };
}
export default Game;
