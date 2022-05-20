import { Socket, Server } from 'socket.io';
import JoinGame from './JoinGame';
import PlayerEvents from './PlayerEvents';
import testEvent from './testEvent';

export default (socket: Socket, io: Server) => {
  testEvent(socket);
  JoinGame(socket, io);
  PlayerEvents(socket, io);
};
