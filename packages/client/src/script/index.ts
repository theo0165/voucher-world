import '../style/index.scss';
import Player from '../types/Player';
import socket from './socket';

socket.on('new player', (data: Player[]) => {
  console.log({ ev: 'new player', data });
});
