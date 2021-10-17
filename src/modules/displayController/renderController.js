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

  function renderFleet(board) {
    console.log(board);
  }

  return { renderBoard, renderFleet };
}
export default renderController;
