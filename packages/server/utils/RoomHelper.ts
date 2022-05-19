import Player from '../types/Player';
import Room from '../types/Room';

const rooms: Room[] = [];

//console.log(parseInt(process.env.MAX_PLAYER!));

export const joinRoom = (player: Player): Room => {
  let hasJoined = false;
  let roomToJoin: Room | null = null;

  // If no rooms are availible, create one
  if (rooms.length == 0) {
    const room = {
      id: '0',
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
    }
  });

  if (hasJoined && roomToJoin) {
    return roomToJoin;
  }

  // No free rooms, create new
  const newRoom = {
    id: 'rooms.length',
    players: [player],
  };

  return newRoom;
};
