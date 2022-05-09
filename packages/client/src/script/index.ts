import '../style/index.scss';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3005');

socket.on('pong', () => {
  console.log('pong');
});

socket.emit('ping');
