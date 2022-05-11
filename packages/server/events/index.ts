import { Socket, Server } from 'socket.io';
import testEvent from './testEvent';

export default (socket: Socket, io: Server) => {
  testEvent(socket);
};
