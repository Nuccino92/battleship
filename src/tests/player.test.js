/* eslint-disable no-undef */
import { fleet } from "../modules/fleet";
import Gameboard from "../modules/gameboard";
import Player from "../modules/player";

describe("Player testing", () => {
  const human = new Player("human");
  const computer = new Player("computer");

  const humanBoard = new Gameboard();
  const computerBoard = new Gameboard();

  test("getting human", () => {
    expect(human.player).toBe("human");
  });
  test("getting computer", () => {
    expect(computer.player).toBe("computer");
  });
  test("human attack board", () => {
    human.placeAttack(0, 0, computerBoard);
    expect(computerBoard.board[0][0]).toBe("miss");
  });
  test("human attack ship", () => {
    const Battleship = fleet().Battleship();
    computerBoard.placeShips(Battleship, 1, 0);
    human.placeAttack(1, 0, computerBoard);
    expect(Battleship.hits).toEqual([null, null, null, "hit"]);
    expect(computerBoard.board[1][0]).toEqual("hit");
  });
  test("computer attack random", () => {
    computer.randomAttack(humanBoard);
    // the humanBoard should not equal the standard board
    expect(humanBoard.board !== Gameboard().board).toBe(true);
  });
});
describe("turns testing", () => {
  const human = new Player("human");
  const computer = new Player("computer");
  test("human gets first turn", () => {
    expect(human.turn).toBe(true);
    expect(computer.turn).toBe(false);
  });
  test("switch the turns", () => {
    human.switchTurn();
    computer.switchTurn();
    expect(human.turn).toBe(false);
    expect(computer.turn).toBe(true);
  });
});
