function Ship(shipName, size) {
  const name = shipName;
  const length = size;
  const isShipSunk = false;
  const direction = "vertical";

  const hits = new Array(length).fill(null);

  function hit() {
    hits.push("hit");
    hits.shift();

    if (hits.every((val) => val === "hit")) {
      this.isShipSunk = true;
    }
  }

  function isSunk() {
    if (this.isShipSunk === true) {
      return true;
    }
    return false;
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
