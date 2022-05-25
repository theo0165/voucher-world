import Game from '../game/Game';
import socket from './socket';
import PlayerType from '../types/Player';

const inputField = document.querySelector('input');
const submitBtn = document.querySelector('#joinBtn');
let game: Game | undefined;

if (inputField && submitBtn) {
  submitBtn.addEventListener('click', () => {
    socket.emit('join game', {
      username: inputField.value,
      id: socket.id,
    });
  });
}

socket.on('join ok', (data) => {
  game = new Game(data.player.username, data);
});

socket.on('new player', (player: PlayerType) => {
  console.log({ player, gamePlayer: game?.player });

  if (game && player.id != game.player.id) {
    game.addPlayer(player);
  }
});

socket.on('player leave', ({ id }) => {
  if (game) {
    game.removePlayer(id);
  }
});

export {};
