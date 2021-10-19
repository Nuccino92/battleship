import {
  domElements,
  toggleHorizontalClass,
} from "./modules/displayController/domElements";

import Game from "./modules/gameLoop";
import "./styles/main.css";

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

function startGame() {
  //starts game
}
function playAgain() {
  //restarts the game
}
function restartGame() {
  // restarts the match without setup
}
