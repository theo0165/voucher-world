import '../style/index.scss';
import Player from '../types/Player';
import Room from '../types/Room';
import socket from './socket';

socket.on('new player', (data: Player[]) => {
  console.log({ ev: 'new player', data });
});
