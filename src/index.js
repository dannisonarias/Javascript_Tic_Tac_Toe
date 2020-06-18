import './style.scss';

const playerFactory = (playerName, playerSymbol) => {
  let name;
  if (playerName === '') {
    name = 'Player';
  } else {
    name = playerName;
  }
  const symbol = playerSymbol;
  const wins = 0;
  return { name, symbol, wins };
};

const display = (() => {
  const player1Info = document.querySelector('#data1');
  const player2Info = document.querySelector('#data2');
  const startBtn = document.querySelector('#start');
  const resetDiv = document.querySelector('.reset-game');
  const resetBtn = document.querySelector('.rst-game-button');
  const declareWinner = document.querySelector('.declare-winner');

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
  const updateNames = () => {
    const name1 = document.querySelector('#player1').value;
    const name2 = document.querySelector('#player2').value;
    const names = { name1, name2 };
    return names;
  };
  const displayPlayers = (players) => {
    const { player1 } = players;
    const { player2 } = players;

    form.classList.add('hidden');
    data.classList.remove('hidden');

    data1.querySelector('.name').innerText = player1.name;
    data1.querySelector('.score').innerText = player1.wins;

    data2.querySelector('.name').innerText = player2.name;
    data2.querySelector('.score').innerText = player2.wins;
  };

  const updateWins = (player) => {
    if (player.symbol === 'X') {
      data1.querySelector('.score').innerText = player.wins;
    } else {
      data2.querySelector('.score').innerText = player.wins;
    }
  };

  return {
    cells,
    board,
    updateNames,
    displayPlayers,
    updateWins,
    startBtn,
    player1Info,
    player2Info,
    resetDiv,
    declareWinner,
    resetBtn,
  };
})();

// game winning combinations
const gameBoard = (() => {
  const WINS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];

  return { WINS };
})();

const Game = (() => {
  let currentPlayer = true;
  let players = {};
  let availableSlots = 9;

  const getPlayers = () => {
    const names = display.updateNames();
    const player1 = playerFactory(names.name1, 'X');
    const player2 = playerFactory(names.name2, 'O');
    players = { player1, player2 };
  };

  const changePlayerTurn = () => {
    display.player1Info.classList.toggle('active-player');
    display.player2Info.classList.toggle('active-player');
    display.player1Info.classList.toggle('inactive-player');
    display.player2Info.classList.toggle('inactive-player');
  };

  const resetGame = () => {
    display.cells.forEach(cell => {
      cell.innerText = '';
    });

    display.resetDiv.classList.add('hidden');
    if (!currentPlayer) {
      currentPlayer = true;
      changePlayerTurn();
    }

    availableSlots = 9;
  };

  const declareReset = (player) => {
    if (!player) {
      display.resetDiv.classList.remove('hidden');
      display.declareWinner.innerHTML = ('Game is a tie');
    } else {
      display.resetDiv.classList.remove('hidden');
      display.declareWinner.innerHTML = (`${player.name} Wins the game`);
      player.wins += 1;
      display.updateWins(player);
    }
  };
  const win = (s) => gameBoard.WINS.some(c => c.every(b => display.cells[b].textContent === s));

  const checkForTie = (player) => {
    if (availableSlots === 0 && !win(player.symbol)) {
      display.resetBtn.addEventListener('click', resetGame, false);
      declareReset();
    }
  };

  const checkForWin = (player) => {
    if (win(player.symbol)) {
      display.resetBtn.addEventListener('click', resetGame, false);
      declareReset(player);
    }
  };

  const clickHandler = (e) => {
    const cell = e.target;
    const player = currentPlayer ? players.player1 : players.player2;

    if (cell.textContent === '') {
      cell.innerHTML = player.symbol;
    } else {
      return;
    }

    availableSlots -= 1;
    checkForWin(player);
    checkForTie(player);
    currentPlayer = !currentPlayer;
    changePlayerTurn();
  };

  const startGame = () => {
    getPlayers();
    display.displayPlayers(players);
    display.board.classList.remove('hidden');
    display.cells.forEach(cell => {
      cell.addEventListener('click', clickHandler, false);
    });
  };

  return { startGame };
})();

display.startBtn.addEventListener('click', Game.startGame, false);