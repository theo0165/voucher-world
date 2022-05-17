import { Server, Socket } from 'socket.io';
import { joinRoom } from '../utils/RoomHelper';
import Player from '../types/Player';

export default (socket: Socket, io: Server) => {
  socket.on('join game', (data: Player) => {
    const room = joinRoom(data);

    socket.join(room.id);

    socket.emit('join ok', { player: data, room });
    io.to(room.id).emit('new player', data);
  });
};
