const playerFactory = (playerName, playerSymbol) => {
  const name = playerName;
  const symbol = playerSymbol;
  const wins = 0;
  return { name, symbol, wins };
}

const display = (() => {
  // get cells
  const cells = document.querySelectorAll('.position');

  // Get player names
  const name1 = document.querySelector('#player1').value;
  const name2 = document.querySelector('#player2').value;

  return {
    cells,
    name1, name2
  }

})();

// game winning combinations
const gameBoard = (() => {
  const WIN_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
  ]

  return { WIN_COMBOS }
})()

const Game = (() => {
  let currentPlayer = true;

  getPlayers = () => {
    const player1 = playerFactory(display.name1, 'X');
    const player2 = playerFactory(display.name2, 'O');

    return { player1, player2 }
  }

  checkForWin = (player) => {
      if (win(player.symbol)){
          console.log(`${player.name} Wins the game`)
      };
  }

  clickHandler = (e) => {
    const cell = e.target
    let player = currentPlayer ? getPlayers().player1 : getPlayers().player2;

    if (cell.textContent === '') {
      cell.innerHTML = player.symbol;
    } else {
      return
    }

    checkForWin(player);

    currentPlayer = !currentPlayer;
  }

  win = (symbol) => {
    return gameBoard.WIN_COMBOS.some(combo => {
      return combo.every(cell => {
        return display.cells[cell].textContent === symbol;
      });
    });
  }

  startGame = () => {
    console.log(getPlayers())

    display.cells.forEach(cell => {
      cell.addEventListener('click', clickHandler, false);
    });
  }

  return { startGame }
})();


console.log(Game.startGame())