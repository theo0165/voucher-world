import { Socket, Server } from 'socket.io';
import JoinGame from './JoinGame';
import testEvent from './testEvent';

export default (socket: Socket, io: Server) => {
  testEvent(socket);
  JoinGame(socket, io);
};
