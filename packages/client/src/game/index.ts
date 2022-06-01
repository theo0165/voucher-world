import Game from './Game';

export const startGame = () => {
  if (window.localStorage.getItem('game') !== null) {
    const game = JSON.parse(window.localStorage.getItem('game') ?? '{}');

    new Game(game.player.username, game);
  }
};

startGame();
