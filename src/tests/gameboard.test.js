/* eslint-disable no-undef */
import fleet from "../modules/fleet";
import Gameboard from "../modules/gameboard";

const testBoard = new Gameboard();
const Battleship = fleet().Battleship();

describe("Gameboard testing", () => {
  test("create board", () => {
    expect(testBoard.board).toEqual([
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null, null],
    ]);
  });
  test("placing ship vertically on board", () => {
    testBoard.placeShips(Battleship, 0, 0);
    expect(testBoard.board[0][0].name).toBe("Battleship");
    expect(testBoard.board[1][0].name).toBe("Battleship");
    expect(testBoard.board[2][0].name).toBe("Battleship");
    expect(testBoard.board[3][0].name).toBe("Battleship");
  });
  test("placing ship horizontally on board", () => {
    const Submarine = fleet().Submarine();
    Submarine.changeDirection();
    testBoard.placeShips(Submarine, 0, 5);
    expect(testBoard.board[0][5].name).toEqual("Submarine");
    expect(testBoard.board[0][6].name).toEqual("Submarine");
    expect(testBoard.board[0][7].name).toEqual("Submarine");
  });
  test("prevent from placing off board", () => {
    const Destroyer = fleet().Destroyer();
    testBoard.placeShips(Destroyer, 0, 10);
    expect(testBoard.board[0][9]).toEqual(null);
    expect(testBoard.board[0][10]).toEqual(undefined);
  });
  test("prevent from placing on another ship", () => {
    const Carrier = fleet().Carrier();
    testBoard.placeShips(Carrier, 0, 0);
    expect(testBoard.board[0][0].name).toBe("Battleship");
    expect(testBoard.board[1][0].name).toBe("Battleship");
    expect(testBoard.board[2][0].name).toBe("Battleship");
    expect(testBoard.board[3][0].name).toBe("Battleship");
    expect(testBoard.board[4][0]).toBe(null);
  });
  test("checking for placed ships tracker", () => {
    expect(testBoard.placedShips[0].name).toBe("Battleship");
  });
  test("attacking an empty space", () => {
    testBoard.recieveAttack(2, 5);
    expect(testBoard.board[2][5]).toBe("miss");
  });
  test("hitting a ship", () => {
    testBoard.recieveAttack(2, 0);
    expect(testBoard.board[0][0].hits).toEqual([null, null, "hit", null]);
  });
  test("logging missed attacks", () => {
    expect(testBoard.missedAttacks).toEqual([[2, 5]]);
  });
  test("checking all ships sunk", () => {
    testBoard.recieveAttack(0, 0);
    testBoard.recieveAttack(1, 0);
    testBoard.recieveAttack(2, 0);
    testBoard.recieveAttack(3, 0);
    testBoard.recieveAttack(0, 5);
    testBoard.recieveAttack(0, 6);
    testBoard.recieveAttack(0, 7);
    testBoard.checkGameOver();
    expect(testBoard.isGameOver).toBe(true);
  });
});
