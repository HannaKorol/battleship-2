import Gameboard from "./modules/Gameboard.js";
import Player from "./modules/Player.js";
import { renderBoard } from "./modules/DOM.js";

const playerBoardElement = document.getElementById("player-board");
const computerBoardElement = document.getElementById("computer-board");
const startGameButton = document.getElementById("start-game");

const player = new Player("Player");
const computer = new Player("Computer", true);

// Place ships randomly before the game starts
player.gameboard.placeRandomShips();
computer.gameboard.placeRandomShips();

// Initially render boards
renderBoard(playerBoardElement, player.gameboard);
renderBoard(computerBoardElement, computer.gameboard);

// Start game button handler
startGameButton.addEventListener("click", () => {
  alert("Game started!");
  startGame();
});

let currentPlayer = player; // Player starts the game

/* --------------------------------------------- startGame ---------------------------------------------------------------*/

// Start the game logic
function startGame() {
  computerBoardElement.addEventListener("click", handlePlayerAttack);
}

// Player's attack handler
function handlePlayerAttack(event) {
  const x = event.target.dataset.x;
  const y = event.target.dataset.y;
  const cell = event.target;

  if (x !== undefined && y !== undefined) {
    // Check if this site has already been attacked
    if (cell.classList.contains("disabled")) {
      console.log("You already attacked this spot!");
      return;
    }

    // Execute the attack
    const attackResult = computer.gameboard.receiveAttack(Number(x), Number(y));

    // Update the boards after an attack
    renderBoard(playerBoardElement, player.gameboard);
    renderBoard(computerBoardElement, computer.gameboard);

    if (attackResult) {
      console.log("Player hit!");
      cell.classList.add("hit");
      cell.classList.add("disabled"); // Disable cell after attack
      if (computer.gameboard.areAllShipsSunk()) {
        alert("Player wins!");
        return;
      }

      // Player continues to attack after being hit
      return;
    } else {
      console.log("Player miss!");
      cell.classList.add("miss");
      cell.classList.add("disabled"); // Disable cell after attack
    }

    // Change player after a miss
    currentPlayer = computer;
    setTimeout(computerTurn, 500); // Delay before computer's turn
  }
}

/* ------------------------------------------------------computer Turn-------------------------------------*/

// Computer stroke
function computerTurn() {
  const [x, y] = computer.makeRandomMove();
  const attackResult = player.gameboard.receiveAttack(x, y);
  renderBoard(playerBoardElement, player.gameboard);
  renderBoard(computerBoardElement, computer.gameboard);

  // Handle the computer's attack result
  const cell = document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
  if (attackResult) {
    console.log("Computer hit!");
    cell.classList.add("hit");
    cell.classList.add("disabled"); // Disable cell after attack
    if (player.gameboard.areAllShipsSunk()) {
      alert("Computer wins!");
      return;
    }
    // Computer continues attacking after a hit
    return;
  } else {
    console.log("Computer miss!");
    cell.classList.add("miss");
    cell.classList.add("disabled"); // Disable cell after attack
  }

  // Switch back to player's turn after miss
  currentPlayer = player;
}
