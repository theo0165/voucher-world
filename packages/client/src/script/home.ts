import socket from './socket';

const inputField = document.querySelector('input');
const submitBtn = document.querySelector('button');

if (inputField && submitBtn) {
  submitBtn.addEventListener('click', () => {
    socket.emit('join game', {
      username: inputField.value,
    });
  });
}

socket.on('join ok', (data) => {});

export {};
