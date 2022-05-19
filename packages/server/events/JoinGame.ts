import { Server, Socket } from 'socket.io';
import { joinRoom } from '../utils/RoomHelper';
import Player from '../types/Player';

export default async (socket: Socket, io: Server) => {
  socket.on('join game', async (data: Player) => {
    console.log({ ev: 'join game', data });

    const room = joinRoom(data);

    await socket.join(room.id);

    console.log(socket.id + ' now in rooms ', getRoomsByUser(socket.id));

    socket.emit('join ok', { player: data, room });

    io.in(room.id).emit('new player', data);
  });

  function getRoomsByUser(id: string) {
    let usersRooms = [];
    let rooms = io.sockets.adapter.rooms;

    for (let room in rooms) {
      if (rooms.hasOwnProperty(room)) {
        //@ts-ignore
        let sockets = rooms[room].sockets;
        if (id in sockets) usersRooms.push(room);
      }
    }

    return usersRooms;
  }
};
