// import { fleet } from "./fleet";

function Ship(shipName, size) {
  const name = shipName;
  const length = size;
  const isShipSunk = false;

  const hits = new Array(length).fill(null);

  function hit(pos) {
    hits.splice(pos, 1, "hit");
  }

  function isSunk() {
    if (hits.every((val) => val === hits[0])) {
      this.isShipSunk = true;
    }
  }

  return { name, length, hits, hit, isShipSunk, isSunk };
}

export default Ship;
