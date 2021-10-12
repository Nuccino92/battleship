// import Ship from "./ship";

function Gameboard() {
  const placedShips = [];
  const missedAttacks = [];
  const isGameOver = false;

  // 10x10 board
  const board = new Array(10).fill(null).map(() => Array(10).fill(null));

  function checkPossiblePlacement(ship, x, y) {
    // disallowing placements outside the board return false
    if (x < 0 || x > 9 || y < 0 || y > 9) return false;

    // if ship doesn't fit inside the board return false
    if (ship.direction === "vertical") {
      if (x + ship.length > 10) return false;
    }
    if (y + ship.length > 10) return false;

    return true;
  }

  function placeShips(ship, x, y) {
    // return false if we can't pass the check
    if (!checkPossiblePlacement(ship, x, y)) return false;

    if (ship.direction === "vertical") {
      for (let i = 0; i < ship.length; i += 1) {
        if (this.board[x + i][y] != null) {
          return false;
        }
        this.board[x + i][y] = ship;
      }
    }
    if (ship.direction === "horizontal") {
      for (let i = 0; i < ship.length; i += 1) {
        if (this.board[x][y + i] != null) {
          return false;
        }
        this.board[x][y + i] = ship;
      }
    }
    // keeps track of the ships placed
    return placedShips.push(ship);
  }

  function recieveAttack(x, y) {
    if (board[x][y] != null) {
      // board[x][y] is the ship, adds hit to the correct place in ships hits array
      this.board[x][y].hit(x);
    }
    if (board[x][y] === null) {
      this.board[x][y] = "miss";
      missedAttacks.push([x, y]);
    }
  }

  function checkGameOver() {
    placedShips.every((ship) => ship.isSunk());
    if (placedShips.every((ship) => ship.isShipSunk === true)) {
      this.isGameOver = true;
    }
  }

  return {
    board,
    placeShips,
    placedShips,
    recieveAttack,
    missedAttacks,
    isGameOver,
    checkGameOver,
  };
}
export default Gameboard;
