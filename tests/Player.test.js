import Player from "../src/modules/Player.js";
import Gameboard from "../src/modules/Gameboard.js";

describe("Player functionality", () => {
  let player;
  let computer;

  beforeEach(() => {
    player = new Player("Player");
    computer = new Player("Computer", true);
  });

  test("Player has a gameboard", () => {
    expect(player.gameboard).toBeInstanceOf(Gameboard);
  });

  test("Player can make random move", () => {
    const move = computer.makeRandomMove();
    expect(move[0]).toBeGreaterThanOrEqual(0);
    expect(move[0]).toBeLessThan(10);
    expect(move[1]).toBeGreaterThanOrEqual(0);
    expect(move[1]).toBeLessThan(10);
  });

  test("Player and Computer are distinct", () => {
    expect(player.isComputer).toBe(false);
    expect(computer.isComputer).toBe(true);
  });
});


/* 
Player:

    The player's possession of the playing field is checked.
    Make sure that the computer generates valid random moves.
    Check that the user and computer are distinguished by the isComputer property.
*/