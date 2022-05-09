import { Socket } from 'socket.io';

export default (socket: Socket) => {
  socket.on('ping', () => {
    socket.emit('pong');
  });
};
