import Ship from "./Ship.js";

export default class Gameboard {
  constructor() {
    this.board = Array(10)
      .fill()
      .map(() => Array(10).fill(null));
    this.missedShots = [];
    this.ships = [];
  }

  // Random placement of ships
  placeRandomShips() {
    const shipLengths = [5, 4, 3, 3, 2];
    shipLengths.forEach((length) => {
      let placed = false;
      while (!placed) {
        try {
          const isHorizontal = Math.random() > 0.5;
          const x = Math.floor(Math.random() * 10);
          const y = Math.floor(Math.random() * 10);
          this.placeShip(x, y, length, isHorizontal);
          placed = true;
        } catch (error) {
          // If you can't place the ship, try again
        }
      }
    });
  }

  // Ship placement
  placeShip(x, y, length, isHorizontal = true) {
    const ship = new Ship(length);
    const positions = [];

    for (let i = 0; i < length; i++) {
      const posX = isHorizontal ? x + i : x;
      const posY = isHorizontal ? y : y + i;

      if (posX >= 10 || posY >= 10 || this.board[posY][posX] !== null) {
        throw new Error("Invalid placement");
      }

      positions.push([posX, posY]);
    }

    positions.forEach(([posX, posY]) => {
      this.board[posY][posX] = ship;
    });

    this.ships.push(ship);
  }

  // Handling the attack
  receiveAttack(x, y) {
    if (this.board[y][x] === null) {
      this.missedShots.push([x, y]);
      return false;
    }

    // Do damage only in a specific cell
    const ship = this.board[y][x];
    ship.hit(x, y);
    return true;
  }

  // Check for sunken ships
  areAllShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}
