import '../style/index.scss';
import socket from './socket';

socket.on('pong', () => {
  console.log('pong');
});

socket.emit('ping');
