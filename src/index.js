import {
  domElements,
  toggleHorizontalClass,
  startDOMManipulation,
} from "./modules/displayController/domElements";
import Game from "./modules/gameLoop";
import "./styles/main.css";

const game = Game();

game.renderGameboards();

game.renderShips();

game.gridListener();

//rotate button event listener
domElements.rotateButton.addEventListener("click", () => {
  toggleHorizontalClass();
  game.fleetChangeDirection();
});

// start button listener
document.querySelector(".start-button").addEventListener("click", () => {
  game.resetEvent();
  game.start();
  startDOMManipulation();
});

// replay button listener
domElements.playAgain.addEventListener("click", () => {
  game.restartGame();
  game.resetEvent();
});
