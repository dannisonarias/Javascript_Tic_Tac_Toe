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
    const player1 = playerFactory(displayController.name1, '&#10007;');
    const player2 = playerFactory(displayController.name2, '&#120420;');

    return { player1, player2 }
  }

  return { getPlayers }
})();


console.log(Game.getPlayers())