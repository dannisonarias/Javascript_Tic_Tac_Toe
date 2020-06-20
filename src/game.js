import playerFactory from './player';
import display from './display';
import gameBoard from './board';

const Game = (() => {
  let currentPlayer = true;
  let players = {};
  let availableSlots = 9;

  const getPlayers = (names) => {
    const player1 = playerFactory(names.name1, 'X');
    const player2 = playerFactory(names.name2, 'O');
    players = { player1, player2 };
    return players;
  };

  const resetGame = () => {
    display.clearCells();
    display.hideReset();

    if (!currentPlayer) {
      currentPlayer = true;
      display.changePlayerTurn();
    }

    availableSlots = 9;
  };

  const declareReset = (player) => {
    if (!player) {
      display.showReset();
      display.displayTie();
      return false;
    }
    display.showReset();
    display.displayWinner(player);
    player.wins += 1;
    display.updateWins(player);
    return true;
  };

  const win = (s, board) => board.WINS.some(c => c.every(b => display.cells[b].textContent === s));

  const checkForTie = (player) => {
    if (availableSlots === 0 && !win(player.symbol, gameBoard)) {
      display.setReset(resetGame);
      declareReset();
      return true;
    }
    return false;
  };

  const checkForWin = (player) => {
    if (win(player.symbol, gameBoard)) {
      display.setReset(resetGame);
      declareReset(player);
      return true;
    }
    return false;
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
    display.changePlayerTurn();
  };

  const startGame = () => {
    getPlayers(display.updateNames());
    display.initializeScreen(players, clickHandler);
  };

  return {
    startGame, checkForWin, checkForTie, declareReset, getPlayers, resetGame,
  };
})();

export default Game;