import Game from '../../types/GameType';
import Player from './Player';

class DebugInfo {
  static create(game: Game) {
    console.log('hello');

    const debugBox = document.createElement('div');

    debugBox.id = 'debug';

    debugBox.textContent = `Room: ${game.room.id} | Player count: ${game.room.players.length} | Player id: ${game.player.id}`;

    document.body.appendChild(debugBox);
  }

  static update(game: Game, players: Player[]) {
    const debugBox = document.querySelector('#debug');

    if (debugBox) {
      debugBox.textContent = `Room: ${game.room.id} | Player count: ${
        players.length + 1
      } | Player id: ${game.player.id}`;
    }
  }
}

export default DebugInfo;
