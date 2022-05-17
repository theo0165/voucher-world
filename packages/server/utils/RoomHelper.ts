import Player from '../types/Player';
import Room from '../types/Room';

const rooms: Room[] = [];

export const joinRoom = (player: Player): Room => {
  // If no rooms are availible, create one
  if (rooms.length == 0) {
    const room = {
      id: 'room-1',
      players: [player],
    };

    rooms.push(room);

    return room;
  }

  // Go over every room
  rooms.forEach((room) => {
    // If player can join, return room
    if (room.players.length < parseInt(process.env.MAX_PLAYER!) ?? 5) {
      room.players.push(player);
      return room;
    }
  });

  // No free rooms, create new
  const newRoom = {
    id: `room-${rooms.length}`,
    players: [player],
  };

  return newRoom;
};
