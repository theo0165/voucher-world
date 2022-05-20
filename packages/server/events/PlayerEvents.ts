import { Server, Socket } from 'socket.io';

export default async (socket: Socket, io: Server) => {
  socket.on('state', (playerState) => {
    socket.to(playerState.roomId).emit('player move', playerState);
  });
};
