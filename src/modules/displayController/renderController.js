import Gameboard from "../gameboard";
import domElements from "./domElements";

function renderController() {
  function createCell(dom, x, y) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");
    cell.setAttribute("data", `x${x}-y${y}`);

    dom.append(cell);
  }

  function renderBoard(dom, boardX) {
    const board = boardX.getBoard();

    board.forEach((x) => {
      board.forEach((y) => {
        const row = board.indexOf(x);
        const col = board.indexOf(y);
        createCell(dom, row, col);
      });
    });
  }

  function renderFleet() {
    //render the fleet
  }

  return { renderBoard };
}
export default renderController;
