import Player from './Player';

export default interface Room {
  id: string;
  players: Player[];
}
