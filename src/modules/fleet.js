import Ship from "./ship";

const shipInfo = [
  ["Carrier", 5],
  ["Battleship", 4],
  ["Cruiser", 3],
  ["Submarine", 3],
  ["Destroyer", 2],
];

const createShips = () => {
  const shipArray = [];
  shipInfo.forEach((ship) => {
    shipArray.push(Ship(ship[0], ship[1]));
  });
  return shipArray;
};

// fleet used mainly for the testing
function fleet() {
  const Carrier = () => new Ship("Carrier", 5);

  const Battleship = () => new Ship("Battleship", 4);

  const Cruiser = () => new Ship("Cruiser", 3);

  const Submarine = () => new Ship("Submarine", 3);

  const Destroyer = () => new Ship("Destroyer", 2);

  return { Carrier, Battleship, Cruiser, Submarine, Destroyer };
}

function matchShip(playerFleet, name) {
  let matchedShip;
  playerFleet.forEach((ship) => {
    if (ship.name === name) {
      matchedShip = ship;
    }
  });
  return matchedShip;
}

export { fleet, createShips, matchShip };
