import { Application, Container, Sprite } from 'pixi.js';
import Player from './classes/Player';

export default class Game {
  player: Player;
  game: Application;
  display: Container;

  constructor(playerName: string, color: string) {
    this.game = new Application({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    this.display = this.game.stage;

    this.player = new Player(this.display, playerName, color);

    document.body.appendChild(this.game.view);

    this.player.draw();

    window.addEventListener('keydown', this.keyDown);
    window.addEventListener('keyup', this.keyUp);
  }

  keyDown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowUp':
        console.log('arrow up');
        break;
      case 'ArrowDown':
        console.log('arrow down');
        break;
      case 'ArrowRight':
        console.log('arrow right');
        break;
      case 'ArrowLeft':
        console.log('arrow left');
        break;
    }
  }

  keyUp(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowUp':
        break;
      case 'ArrowDown':
        break;
      case 'ArrowRight':
        break;
      case 'ArrwoLeft':
        break;
    }
  }
}
