function Ship(shipName, size) {
  const name = shipName;
  const length = size;
  const isShipSunk = false;
  const direction = "vertical";

  const hits = new Array(length).fill(null);

  function hit(pos) {
    hits.splice(pos, 1, "hit");
  }

  function isSunk() {
    if (hits.every((val) => val === hits[0])) {
      this.isShipSunk = true;
    }
  }
  function changeDirection() {
    if (this.direction === "vertical") {
      this.direction = "horizontal";
    } else if (this.direction === "horizontal") {
      this.direction = "vertical";
    }
  }

  return {
    name,
    length,
    hits,
    hit,
    isShipSunk,
    isSunk,
    direction,
    changeDirection,
  };
}

export default Ship;
