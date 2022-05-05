import { Application, Container, Sprite } from 'pixi.js';
import Player from './classes/Player';

const keysPressed: { [key: string]: boolean } = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowDown: false,
  ArrowUp: false,
};

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

    this.game.ticker.add(this.gameLoop, this);

    window.addEventListener('keydown', this.keyDown, false);
    window.addEventListener('keyup', this.keyUp, false);
  }

  keyDown(e: KeyboardEvent) {
    const keyCode = e.key;

    switch (keyCode) {
      case 'ArrowUp':
        keysPressed[keyCode] = true;
        break;
      case 'ArrowDown':
        keysPressed[keyCode] = true;
        break;
      case 'ArrowRight':
        keysPressed[keyCode] = true;
        break;
      case 'ArrowLeft':
        keysPressed[keyCode] = true;
        break;
    }
  }

  keyUp(e: KeyboardEvent) {
    const keyCode = e.key;

    switch (keyCode) {
      case 'ArrowUp':
        keysPressed[keyCode] = false;
        break;
      case 'ArrowDown':
        keysPressed[keyCode] = false;
        break;
      case 'ArrowRight':
        keysPressed[keyCode] = false;
        break;
      case 'ArrowLeft':
        keysPressed[keyCode] = false;
        break;
    }
  }

  gameLoop() {
    console.log(keysPressed);

    this.player.move(keysPressed);
  }
}
