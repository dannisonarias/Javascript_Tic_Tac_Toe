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

export default playerFactory;