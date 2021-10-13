/* eslint-disable no-undef */
import fleet from "../modules/fleet";
import Gameboard from "../modules/gameboard";

const testBoard = new Gameboard();
const Battleship = fleet().Battleship();

const Submarine = fleet().Submarine();
Submarine.changeDirection();

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
    testBoard.recieveAttack(1, 0);
    expect(testBoard.board[1][0]).toEqual("hit");
    expect(Battleship.hits).toEqual([null, null, null, "hit"]);
  });
  test("logging attacks", () => {
    expect(testBoard.attackLog).toEqual([
      { miss: { x: 2, y: 5 } },
      { hit: { x: 1, y: 0 } },
    ]);
  });
  test("checking all ships sunk", () => {
    testBoard.recieveAttack(0, 0);
    testBoard.recieveAttack(2, 0);
    testBoard.recieveAttack(3, 0);
    testBoard.recieveAttack(0, 5);
    testBoard.recieveAttack(0, 6);
    testBoard.recieveAttack(0, 7);
    expect(testBoard.checkGameOver()).toBe(true);
    // expect(testBoard.placedShips[1].isShipSunk).toBe("true");
  });
});
