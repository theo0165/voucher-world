import { Socket } from 'socket.io';
import testEvent from './testEvent';

export default (socket: Socket) => {
  testEvent(socket);
};
