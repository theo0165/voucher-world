import socket from './socket';

socket.on('join ok', (data) => console.log({ ev: 'join ok', data }));

socket.on('new player', (data) => console.log({ ev: 'new player', data }));

socket.emit('join game', { username: 'test-user', x: 0, y: 0 });

export {};
