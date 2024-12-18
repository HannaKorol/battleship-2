export function renderBoard(boardElement, gameboard) {
  // Clean the board before rendering
  boardElement.innerHTML = "";

  // Go through each cell of the board and add the corresponding class
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const cell = document.createElement("div");
      cell.dataset.x = x;
      cell.dataset.y = y;

      // Define what will be displayed in the cell
      const ship = gameboard.board[y][x];

      if (ship !== null) {
        // If there is a ship on the cell
        if (ship.isSunk()) {
          // If a ship is sunk, all its cells turn green
          cell.classList.add("ship", "sunk");
        } else if (ship.hits[y]) {
          // If the ship was wounded but not sunk, show blue color
          cell.classList.add("ship", "hit");
        } else {
          cell.classList.add("ship");
        }
      } else if (
        gameboard.missedShots.some(
          ([missX, missY]) => missX === x && missY === y
        )
      ) {
        // If it's a miss
        cell.classList.add("miss");
      } else {
        // Empty cell
        cell.classList.add("empty");
      }

      boardElement.appendChild(cell);
    }
  }
}
