import Gameboard from "../src/modules/Gameboard.js";

describe("Gameboard functionality", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  test("Should place a ship correctly", () => {
    gameboard.placeShip(0, 0, 3, true); // horisontal placement
    expect(gameboard.board[0][0]).not.toBeNull();
    expect(gameboard.board[0][1]).not.toBeNull();
    expect(gameboard.board[0][2]).not.toBeNull();
    expect(gameboard.board[0][3]).toBeNull();
  });

  test("Should throw error for invalid ship placement", () => {
    expect(() => gameboard.placeShip(9, 9, 3, true)).toThrow(
      "Invalid placement"
    );
  });

  test("Should register a hit correctly", () => {
    gameboard.placeShip(0, 0, 3, true);
    expect(gameboard.receiveAttack(0, 0)).toBe(true); // hits
  });

  test("Should register a missed shot correctly", () => {
    gameboard.receiveAttack(5, 5); // misses!
    expect(gameboard.missedShots).toContainEqual([5, 5]);
  });

  test("Should detect all ships sunk", () => {
    gameboard.placeShip(0, 0, 2, true);
    gameboard.receiveAttack(0, 0); // first hit
    gameboard.receiveAttack(1, 0); // second hit
    expect(gameboard.areAllShipsSunk()).toBe(true);
  });

  test("Should report not all ships sunk", () => {
    gameboard.placeShip(0, 0, 2, true);
    gameboard.receiveAttack(0, 0); // one hit
    expect(gameboard.areAllShipsSunk()).toBe(false);
  });
});


/* 
Gameboard:

    1. The correctness of ship placement is tested, including the case of incorrect placement.
    2. A 'hit' and a 'miss' are tested.
    3. Checks whether the board recognizes when all ships are sunk.
    
    */
