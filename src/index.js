import {
  domElements,
  toggleHorizontalClass,
  startDOMManipulation,
  chatBoxController,
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
  game.start();
  startDOMManipulation();
});

// replay button listener
domElements.playAgain.addEventListener("click", () => {
  game.restartGame();
});

// reset round button listener
domElements.resetButton.addEventListener(
  "click",
  (e) => {
    chatBoxController("reset");
    setTimeout(
      () => {
        game.restartGame();
      },
      3000,
      { once: false }
    );
  },
  { once: true }
);
