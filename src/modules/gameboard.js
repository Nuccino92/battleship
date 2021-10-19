function Gameboard() {
  const placedShips = [];
  const attackLog = [];

  // 10x10 board
  const board = new Array(10).fill(null).map(() => Array(10).fill(null));
  const getBoard = () => board;

  function checkPossiblePlacement(ship, x, y) {
    // disallowing placements outside the board return false
    if (x < 0 || x > 9 || y < 0 || y > 9) {
      return false;
    }

    // if ship doesn't fit inside the board return false
    if (ship.direction === "horizontal") {
      if (y + ship.length > 10) return false;
    }

    if (ship.direction === "vertical") {
      if (x + ship.length > 10) return false;
    }
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
      attackLog.push({ hit: { x, y } });
      // board[x][y] is the ship, runs hit function on the ship
      this.board[x][y].hit();
      this.board[x][y] = "hit";
    }
    if (board[x][y] === null) {
      attackLog.push({ miss: { x, y } });
      this.board[x][y] = "miss";
    }
  }

  function checkGameOver() {
    if (placedShips.every((ship) => ship.isSunk())) {
      return true;
    }
    return false;
  }

  return {
    board,
    placeShips,
    placedShips,
    recieveAttack,
    attackLog,
    checkGameOver,
    getBoard,
  };
}
export default Gameboard;
