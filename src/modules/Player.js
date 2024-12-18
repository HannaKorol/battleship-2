import Gameboard from "./Gameboard.js";

export default class Player {
  constructor(name, isComputer = false) {
    this.name = name;
    this.isComputer = isComputer;
    this.gameboard = new Gameboard();
  }

  makeRandomMove() {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
  }
}
