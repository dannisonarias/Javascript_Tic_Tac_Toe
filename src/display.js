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

  const changePlayerTurn = () => {
    player1Info.classList.toggle('active-player');
    player2Info.classList.toggle('active-player');
    player1Info.classList.toggle('inactive-player');
    player2Info.classList.toggle('inactive-player');
  };

  const clearCells = () => {
    cells.forEach(cell => {
      cell.innerText = '';
    });
  };

  const hideReset = () => {
    resetDiv.classList.add('hidden');
  };

  const showReset = () => {
    resetDiv.classList.remove('hidden');
  };

  const displayTie = () => {
    display.declareWinner.innerHTML = ('Game is a tie');
  };

  const displayWinner = (player) => {
    display.declareWinner.innerHTML = (`${player.name} Wins the game`);
  };

  const setReset = (event) => {
    resetBtn.addEventListener('click', event, false);
  };

  const setGameStart = (event) => {
    startBtn.addEventListener('click', event, false);
  };

  const initializeScreen = (players, clickHandler) => {
    displayPlayers(players);
    board.classList.remove('hidden');
    cells.forEach(cell => {
      cell.addEventListener('click', clickHandler, false);
    });
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
    changePlayerTurn,
    clearCells,
    hideReset,
    showReset,
    displayTie,
    displayWinner,
    setReset,
    setGameStart,
    initializeScreen,
  };
})();

export default display;