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
