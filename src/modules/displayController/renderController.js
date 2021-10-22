import { domElements } from "./domElements";

function renderController() {
  function checkForShip(board, x, y, cell) {
    if (board[x][y] != null) {
      return cell.classList.add(board[x][y].name);
    }
  }

  function checkForAttack(board, x, y, cell) {
    if (board[x][y] === "hit") {
      cell.classList.add("hit");
    }

    if (board[x][y] === "miss") {
      cell.classList.add("miss");
    }
  }

  function createCell(dom, x, y, type, board) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");
    checkForShip(board, x, y, cell);
    checkForAttack(board, x, y, cell);
    cell.id = type;
    cell.setAttribute("data-x", `${x}`);
    cell.setAttribute("data-y", `${y}`);

    dom.append(cell);
  }

  function renderBoard(dom, boardRecieved, type) {
    dom.textContent = "";
    const board = boardRecieved.getBoard();

    board.forEach((x) => {
      board.forEach((y) => {
        const row = board.indexOf(x);
        const col = board.indexOf(y);
        createCell(dom, row, col, type, board);
      });
    });
  }

  function renderShip(ship) {
    const container = document.createElement("div");
    container.classList.add("ship", `${ship.name}-container`);
    container.setAttribute("data-name", `${ship.name}`);
    container.setAttribute("draggable", true);

    let shipDiv = "";
    for (let i = 0; i < ship.length; i += 1) {
      shipDiv += `<div class="ship-cell" data-index='${i}'></div>`;
    }
    container.insertAdjacentHTML("afterbegin", shipDiv);
    domElements.shipSetupContainer.append(container);
  }

  function renderFleet(ships) {
    ships.forEach((ship) => {
      renderShip(ship);
    });
  }

  return { renderBoard, renderFleet, checkForShip };
}
export default renderController;
