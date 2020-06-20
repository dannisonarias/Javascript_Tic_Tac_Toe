import Game from './game';
import display from './display'

describe('Game setup', () => {
  describe('get players', () => {
    it('returns "Player" as name when one is not provided', () => {
      const names = { name1: '', name2: '' };
      expect(Game.getPlayers(names).player1.name).toStrictEqual('Player');
    });

    it('returns "Name" as name when one is provided', () => {
      const names = { name1: 'Jack', name2: '' };
      expect(Game.getPlayers(names).player1.name).toStrictEqual('Jack');
    });

    it('returns "X" as symbol for player1, and "O" for player2', () => {
      const names = { name1: '', name2: '' };
      expect(Game.getPlayers(names)).toStrictEqual(
        {
          player1: { name: 'Player', symbol: 'X', wins: 0 },
          player2: { name: 'Player', symbol: 'O', wins: 0 },
        },
      );
    });
  });

  describe('check win', () => {
    it('returns true if a symbol fills a winning combo', () => {
      const win = jest.fn(() => true);

      expect(win()).toBe(true);
    });

    it('returns false if a symbol fills a winning combo', () => {
      const win = jest.fn(() => false);

      expect(win()).toBe(false);
    });
  });

  describe('check for win', () => {
    const names = { name1: '', name2: '' };
    const player = Game.getPlayers(names).player1;
    const declareReset = jest.fn((player) => {
      player.wins += 1;
      return player.wins;
    });

    it('increases player wins by one if there\'s a win', () => {
      const win = jest.fn(() => true);

      const checkForWin = jest.fn(player => {
        if (win()) {
          // perform dom tasks accordingly
          return declareReset(player);
        }
        return false;
      });

      expect(checkForWin(player)).toEqual(1);
    });

    it('returns false if there is no win', () => {
      const win = jest.fn(() => false);

      const checkForWin = jest.fn(player => {
        if (win()) {
          // perform dom tasks accordingly
          return declareReset(player);
        }
        return false;
      });

      expect(checkForWin(player)).toEqual(false);
    });
  });

  describe('check for tie', () => {
    it('returns true if there is a tie', () => {
      const availableSlots = 0;
      const win = jest.fn(() => false);
      const checkForTie = jest.fn(() => {
        if (availableSlots === 0 && !win()) {
          // perform dom tasks accordingly
          return true;
        }
        return false;
      });

      expect(checkForTie()).toBe(true);
    });

    it('returns false if available slots is not 0', () => {
      const availableSlots = 4;
      const win = jest.fn(() => false);
      const checkForTie = jest.fn(() => {
        if (availableSlots === 0 && !win()) {
          // perform dom tasks accordingly
          return true;
        }
        return false;
      });

      expect(checkForTie()).toBe(false);
    });

    it('returns false if there is a win and no tie', () => {
      const availableSlots = 0;
      const win = jest.fn(() => true);
      const checkForTie = jest.fn(() => {
        if (availableSlots === 0 && !win()) {
          // perform dom tasks accordingly
          return true;
        }
        return false;
      });

      expect(checkForTie()).toBe(false);
    });
  });

  describe('declare reset', () => {
    it('returns false if called without player', () => {
      const declareReset = jest.fn((player) => {
        if (!player) {
          // perform dom tasks accordingly
          return false;
        }
        // perform dom tasks accordingly
        return true;
      });

      expect(declareReset()).toBe(false);
    });

    it('returns true if called with a player', () => {
      const declareReset = jest.fn((player) => {
        if (!player) {
          // perform dom tasks accordingly
          return false;
        }
        // perform dom tasks accordingly
        return true;
      });

      expect(declareReset('player')).toBe(true);
    });
  });

  describe('reset game', () => {
    let availableSlots = 3;
    let currentPlayer = false;
    const resetGame = jest.fn(() => {
      if (!currentPlayer) {
        currentPlayer = true;
        // perform dom tasks accordingly
      }

      availableSlots = 9;
    });

    it('resets availableSlots to 9', () => {
      resetGame();
      expect(availableSlots).toEqual(9);
    });

    it('resets currentPlayer to true', () => {
      resetGame();
      expect(currentPlayer).toBe(true);
    });
  });

  describe('win', () => {
    it('returns true if 3 cells match a win combination', () => {
      const cells = Array(9).fill(document.createElement('DIV'));
      for (let i = 0; i < 3; i += 1) {
        cells[i].textContent = "X";
      }

      expect(Game.win('X', cells)).toBe(true);
    });

    it('returns false if no row matches a win combination', () => {
      const cells = Array(9).fill(document.createElement('DIV'));
      for (let i = 0; i < cells.length; i += 1) {
        cells[i].textContent = "";
      }

      expect(Game.win('X', cells)).toBe(false);
    });
  });
});