import Ship from "./ship";

// eslint-disable-next-line import/prefer-default-export
function fleet() {
  const Carrier = () => new Ship("Carrier", 5);

  const Battleship = () => new Ship("Battleship", 4);

  const Cruiser = () => new Ship("Cruiser", 3);

  const Submarine = () => new Ship("Submarine", 3);

  const Destroyer = () => new Ship("Destroyer", 2);

  return { Carrier, Battleship, Cruiser, Submarine, Destroyer };
}

export default fleet;
