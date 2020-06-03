const playerFactory = (playerName, playerSymbol) => {
  let name;
  if (playerName === "") {
    name = "Player"
  }
  else {
    name = playerName
  }
  const symbol = playerSymbol;
  const wins = 0;
  return { name, symbol, wins };
}

const display = (() => {
  const player1Info = document.querySelector("#data1")
  const player2Info = document.querySelector("#data2")
  const startBtn = document.querySelector('#start');
  const reset_Div = document.querySelector(".reset-game");
  const resetBtn = document.querySelector(".rst-game-button");
  const declare_Winner = document.querySelector(".declare-winner");

  const cells = document.querySelectorAll('.position');

  const form = document.querySelector('.form');

  const board = document.querySelector('.board-wrapper');

  // Get player names from inputs
//   const name1 = document.querySelector('#player1').value;
//   const name2 = document.querySelector('#player2').value;
  // Display player data
  const data = document.querySelector('.data');
  // Player 1 
  const data1 = document.querySelector('#data1');
  // Player 2
  const data2 = document.querySelector('#data2');
    updateNames = () => {
        const name1 = document.querySelector('#player1').value;
        const name2 = document.querySelector('#player2').value;
        names = {name1,name2}
        return names
    }
  displayPlayers = (players) => {
    let player1 = players.player1;
    let player2 = players.player2;

    form.classList.add('hidden');
    data.classList.remove('hidden');

    data1.querySelector('.name').innerText = player1.name;
    data1.querySelector('.score').innerText = player1.wins;

    data2.querySelector('.name').innerText = player2.name;
    data2.querySelector('.score').innerText = player2.wins;
  }

  updateWins = (player) => {
    if (player.symbol == 'X') {
      data1.querySelector('.score').innerText = player.wins;
    } else {
      data2.querySelector('.score').innerText = player.wins;
    }
  }

  return {
    cells, board,
    updateNames,
    displayPlayers, updateWins,
    startBtn,player1Info,player2Info,
    reset_Div, declare_Winner, resetBtn
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
  var players = {}
  var availableSlots = 9;

  getPlayers = () => {
    let names = display.updateNames()
    const player1 = playerFactory(names.name1, 'X');
    const player2 = playerFactory(names.name2, 'O');
    players = { player1, player2 }
  }

  resetGame = () => {
    display.cells.forEach(cell => {
      cell.innerText = "";
    })

    display.reset_Div.classList.add("hidden")
    currentPlayer = true;
    availableSlots = 9;
  }

  declareReset = (player) => {
    if (!player) {
      display.reset_Div.classList.remove("hidden")
      display.declare_Winner.innerHTML = (`Game is a tie`);
    } else {
      display.reset_Div.classList.remove("hidden")
      display.declare_Winner.innerHTML = (`${player.name} Wins the game`)
      player.wins += 1;
      display.updateWins(player)
    }
  }

  checkForTie = (player) => {
    if (availableSlots === 0 && !win(player.symbol)) {
      display.resetBtn.addEventListener("click", resetGame, false);
      declareReset()
    }
  }

  checkForWin = (player) => {
    if (win(player.symbol)) {
      display.resetBtn.addEventListener("click", resetGame, false);
      declareReset(player);
    }
  }

  clickHandler = (e) => {
    const cell = e.target
    let player = currentPlayer ? players.player1 : players.player2;

    if (cell.textContent === '') {
      cell.innerHTML = player.symbol;
    } else {
      return
    }
  changePlayerTurn = () =>{
    currentPlayer = !currentPlayer;
    display.player1Info.classList.toggle("active-player")
    display.player2Info.classList.toggle("active-player")
    display.player1Info.classList.toggle("inactive-player")
    display.player2Info.classList.toggle("inactive-player")
  }

    availableSlots--;
    checkForWin(player);
    checkForTie(player)
    changePlayerTurn()
  }

  win = (symbol) => {
    return gameBoard.WIN_COMBOS.some(combo => {
      return combo.every(cell => {
        return display.cells[cell].textContent === symbol;
      });
    });
  }

  startGame = () => {
    getPlayers();
    display.displayPlayers(players);
    display.board.classList.remove('hidden');
    display.cells.forEach(cell => {
      cell.addEventListener('click', clickHandler, false);
    });
  }

  return { startGame }
})();

display.startBtn.addEventListener('click', Game.startGame, false);