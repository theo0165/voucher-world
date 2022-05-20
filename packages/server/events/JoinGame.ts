import { Server, Socket } from 'socket.io';
import { joinRoom } from '../utils/RoomHelper';
import Player from '../types/Player';

export default async (socket: Socket, io: Server) => {
  socket.on('join game', async (data: Player) => {
    console.log({ ev: 'join game', data });

    const room = joinRoom(data);

    await socket.join(room.id);

    socket.emit('join ok', { player: data, room });

    io.to(room.id).emit('new player', data);
  });
};
