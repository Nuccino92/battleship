import Ship from "./ship";

const Carrier = new Ship("Carrier", 5);
const Battleship = new Ship("Battleship", 4);
const Cruiser = new Ship("Cruiser", 3);
const Submarine = new Ship("Submarine", 3);
const Destroyer = new Ship("Destroyer", 2);

// eslint-disable-next-line import/prefer-default-export
function fleet() {
  const Carrier = () => new Ship("Carrier", 5);

  const Battleship = () => new Ship("Battleship", 4);

  const Cruiser = () => new Ship("Cruiser", 3);

  const Submarine = () => new Ship("Submarine", 3);

  const Destroyer = () => new Ship("Destroyer", 2);

  return { Carrier, Battleship, Cruiser, Submarine, Destroyer };
}

const ships = [Carrier, Battleship, Cruiser, Submarine, Destroyer];

function matchShip(name) {
  let matchedShip;
  ships.forEach((ship) => {
    if (ship.name === name) {
      matchedShip = ship;
    }
  });
  return matchedShip;
}

export { fleet, ships, matchShip };
