import {
  domElements,
  toggleHorizontalClass,
} from "./modules/displayController/domElements";
import { fleet } from "./modules/fleet";
import Gameboard from "./modules/gameboard";
import Game from "./modules/gameLoop";

import "./styles/main.css";

const computerBoard = new Gameboard();
const game = Game();

game.renderGameboards();

game.renderShips();

const grid = document.querySelectorAll(".grid-cell");

grid.forEach((cell) =>
  cell.addEventListener(
    "click",
    (e) => {
      game.boardAttack(e);
    },
    { once: true }
  )
);

//rotate button event listener

domElements.rotateButton.addEventListener("click", () => {
  toggleHorizontalClass();
  game.fleetChangeDirection();
});

document.querySelector(".start-button").addEventListener("click", () => {
  domElements.setupContainer.classList.add("remove");
  domElements.computerGameboard.classList.add("active");
  game.start();
  domElements.startButton.classList.remove("active");
});

domElements.playAgain.addEventListener("click", () => {
  domElements.modalContainer.classList.remove("active");
  game.restartGame();
});

function playAgain() {
  //restarts the game
}
function restartGame() {
  // restarts the match without setup
}
