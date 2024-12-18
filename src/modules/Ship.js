// Ship.js
export default class Ship {
  constructor(length) {
    this.length = length;
    this.hits = new Array(length).fill(false); // Array that tracks hits
  }

  // Method for applying a hit
    hit(x, y) {
    this.hits[y] = true;
  }



  // Check if the ship is sunk
  isSunk() {
    return this.hits.every((hit) => hit); // If all hits, the ship is sunk.
  }
}
