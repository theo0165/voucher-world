import Player from './Player';
import Room from './Room';

export default interface Game {
  player: Player;
  room: Room;
}
