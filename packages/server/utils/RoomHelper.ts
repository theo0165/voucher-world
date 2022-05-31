import Player from '../types/Player';
import Room from '../types/Room';

const rooms: Room[] = [];

export const joinRoom = (player: Player): Room => {
  let hasJoined = false;
  let roomToJoin: Room | null = null;

  // If no rooms are availible, create one
  if (rooms.length == 0) {
    const room = {
      id: 'room-0',
      players: [player],
    };

    rooms.push(room);

    return room;
  }

  // Go over every room
  rooms.forEach((room) => {
    // If player can join, return room
    if (room.players.length < 5) {
      room.players.push(player);

      hasJoined = true;
      roomToJoin = room;

      return;
    }
  });

  if (hasJoined && roomToJoin) {
    return roomToJoin;
  }

  // No free rooms, create new
  const newRoom = {
    id: `room-${rooms.length}`,
    players: [player],
  };

  return newRoom;
};

export const leaveRoom = (roomId: string, playerId: string) => {
  rooms.forEach((room, roomIndex) => {
    if (room.id == roomId) {
      room.players.forEach((player, index) => {
        if (player.id == playerId) {
          room.players.splice(index, 1);

          if (room.players.length == 0) {
            rooms.splice(roomIndex, 1);
          }
        }
      });
    }
  });
};
