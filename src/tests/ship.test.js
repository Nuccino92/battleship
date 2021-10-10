/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies

import Ship from "../modules/ship";

const testShip = new Ship("Battleship", 4);

describe("Created Ships", () => {
  describe("properties", () => {
    test("check ship name", () => {
      expect(testShip.name).toBe("Battleship");
    });

    test("check ship length", () => {
      expect(testShip.length).toBe(4);
    });
  });
});

describe("Hit/Sunk functionality", () => {
  test("the ship has hits array", () => {
    expect(testShip.hits).toEqual([null, null, null, null]);
  });
  test("check working hit function", () => {
    testShip.hit(1);
    expect(testShip.hits).toEqual([null, "hit", null, null]);
  });

  test("working isShipSunk status", () => {
    expect(testShip.isShipSunk).toBe(false);
  });
  test("sink the ship", () => {
    testShip.hit(0);
    testShip.hit(2);
    testShip.hit(3);
    testShip.isSunk();
    expect(testShip.isShipSunk).toBe(true);
  });
});
