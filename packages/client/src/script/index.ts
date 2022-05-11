import '../style/index.scss';
import { io, Socket } from 'socket.io-client';

let socket: Socket;

if (import.meta.env.VITE_SERVER_URL) {
  socket = io(import.meta.env.VITE_SERVER_URL);
} else {
  throw new Error('Server url not defined in env file');
}

socket.on('pong', () => {
  console.log('pong');
});

socket.emit('ping');
