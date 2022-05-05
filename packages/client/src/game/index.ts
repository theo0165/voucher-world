import Game from './Game';

// Start a new game/join a game
export const startGame = () => {
  new Game('spelare', 'red');
};

startGame();
