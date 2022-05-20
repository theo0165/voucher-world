import { Socket, Server } from 'socket.io';
import { leaveRoom } from '../utils/RoomHelper';
import JoinGame from './JoinGame';
import PlayerEvents from './PlayerEvents';
import testEvent from './testEvent';

export default (socket: Socket, io: Server) => {
  testEvent(socket);
  JoinGame(socket, io);
  PlayerEvents(socket, io);

  socket.on('disconnecting', () => {
    // Send event to users that player has left
    // Leave room
    // Destroy room if empty
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        socket.to(room).emit('player leave', { id: socket.id });
        leaveRoom(room, socket.id);
        socket.leave(room);
      }
    }
  });
};
