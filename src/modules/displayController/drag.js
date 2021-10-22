import { matchShip } from "../fleet";
import Gameboard from "../gameboard";
import { domElements } from "./domElements";
import renderController from "./renderController";

function Drag(playerBoard) {
  function dragEventListeners() {
    const ships = document.querySelectorAll(".ship");
    const cells = document.querySelectorAll(".grid-cell");

    ships.forEach((ship) => ship.addEventListener("dragstart", dragStart));

    cells.forEach((cell) => cell.addEventListener("dragover", dragOver));
    cells.forEach((cell) => cell.addEventListener("dragenter", dragEnter));
    cells.forEach((cell) => cell.addEventListener("dragleave", dragLeave));
    cells.forEach((cell) => cell.addEventListener("drop", dragDrop));
    cells.forEach((cell) => cell.addEventListener("dragend", dragEnd));

    ships.forEach((ship) =>
      ship.addEventListener("mousedown", (e) => {
        // eslint-disable-next-line no-use-before-define
        selectedShipNameWithIndex = e.target;
      })
    );
  }

  let selectedShipNameWithIndex;
  let draggedShip;

  function dragStart(e) {
    draggedShip = e.target;
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
  }

  function dragLeave() {
    console.log("dragleave");
  }
  function dragDrop(e) {
    const cell = e.target;
    const ship = matchShip(draggedShip.dataset.name);
    const index = Number(selectedShipNameWithIndex.dataset.index);

    let x = Number(cell.dataset.x);
    let y = Number(cell.dataset.y);

    // gets the correct starting point
    if (ship.direction === "vertical") {
      x = x - index;
    }
    // gets the correct starting point
    if (ship.direction === "horizontal") {
      y = y - index;
    }

    const placed = playerBoard.placeShips(ship, x, y);

    if (placed) {
      renderController().renderBoard(domElements.playerGameboard, playerBoard);
      dragEventListeners();
      draggedShip.style.display = "none";

      console.log(playerBoard.placedShips);

      // checks if all the 5 ships have been placed
      if (playerBoard.placedShips.length === 5) {
        domElements.setupContainer.classList.add("remove");
        domElements.startButton.classList.add("active");
      }
    }
  }

  function dragEnd() {
    //
  }
  return { dragEventListeners };
}

export default Drag;
