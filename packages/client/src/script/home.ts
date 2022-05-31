import Game from '../game/Game';
import socket from './socket';
import PlayerType from '../types/Player';

const submitBtn = document.querySelector('#joinBtn');
const usernameInput = document.querySelector('input');
const usernameInputContainer = document.querySelector('.usernameInput');
let game: Game | undefined;

if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Xbox|Playstation/i.test(
    navigator.userAgent
  ) ||
  navigator.maxTouchPoints > 0
) {
  document.body.classList.add('mobile');
}

const inputError = (el: Element, errorText: string) => {
  const errorBox = el.querySelector('.error');

  if (errorBox) {
    errorBox.textContent = errorText;
  } else {
    const newErrorBox = document.createElement('p');

    newErrorBox.classList.add('error');
    newErrorBox.textContent = errorText;

    el.appendChild(newErrorBox);
  }
};

if (usernameInput && submitBtn) {
  submitBtn.addEventListener('click', () => {
    if (usernameInput.value.trim().length <= 0) {
      if (!usernameInputContainer) return;

      inputError(usernameInputContainer, 'This field is required');

      return;
    }

    socket.emit('join game', {
      username: usernameInput.value.trim(),
      id: socket.id,
    });
  });
}

socket.on('join ok', (data) => {
  game = new Game(data.player.username, data);
});

socket.on('new player', (player: PlayerType) => {
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
