import { domElements } from "./domElements";

function renderController() {
  function createCell(dom, x, y, type) {
    const cell = document.createElement("div");
    cell.classList.add("grid-cell");
    cell.id = type;
    cell.setAttribute("data-x", `${x}`);
    cell.setAttribute("data-y", `${y}`);

    dom.append(cell);
  }

  function renderBoard(dom, boardX, type) {
    const board = boardX.getBoard();

    board.forEach((x) => {
      board.forEach((y) => {
        const row = board.indexOf(x);
        const col = board.indexOf(y);
        createCell(dom, row, col, type);
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

  return { renderBoard, renderFleet };
}
export default renderController;
