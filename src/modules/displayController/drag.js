import { matchShip } from "../fleet";
import { domElements } from "./domElements";

function Drag(playerBoard) {
  const ships = document.querySelectorAll(".ship");
  const cells = domElements.playerGameboard.childNodes;

  ships.forEach((ship) => ship.addEventListener("dragstart", dragStart));
  cells.forEach((cell) => cell.addEventListener("dragover", dragOver));
  cells.forEach((cell) => cell.addEventListener("dragenter", dragEnter));
  cells.forEach((cell) => cell.addEventListener("dragleave", dragLeave));
  cells.forEach((cell) => cell.addEventListener("drop", dragDrop));
  cells.forEach((cell) => cell.addEventListener("dragend", dragEnd));

  let selectedShipNameWithIndex;
  let draggedShip;

  ships.forEach((ship) =>
    ship.addEventListener("mousedown", (e) => {
      selectedShipNameWithIndex = e.target;
    })
  );

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

    //gets the correct starting point
    if (ship.direction === "vertical") {
      x = x - index;
    }
    //gets the correct starting point
    if (ship.direction === "horizontal") {
      y = y - index;
    }

    playerBoard.placeShips(ship, x, y);
  }
  function dragEnd() {
    //
  }
}

export default Drag;
