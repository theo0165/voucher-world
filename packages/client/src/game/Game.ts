import { Application, Container, Sprite } from 'pixi.js';
import Player from './classes/Player';

export default class Game {
  player: Player;
  game: Application;
  display: Container;
  keysPressed: { [key: string]: boolean } = {
    ArrowLeft: false,
    ArrowRight: false,
    ArrowDown: false,
    ArrowUp: false,
  };

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

    window.addEventListener(
      'keydown',
      (e: KeyboardEvent) => this.keyDown(e),
      false
    );
    window.addEventListener(
      'keyup',
      (e: KeyboardEvent) => this.keyUp(e),
      false
    );
  }

  keyDown(e: KeyboardEvent) {
    const keyCode = e.key;

    switch (keyCode) {
      case 'ArrowUp':
        this.keysPressed[keyCode] = true;
        break;
      case 'ArrowDown':
        this.keysPressed[keyCode] = true;
        break;
      case 'ArrowRight':
        this.keysPressed[keyCode] = true;
        break;
      case 'ArrowLeft':
        this.keysPressed[keyCode] = true;
        break;
    }
  }

  keyUp(e: KeyboardEvent) {
    const keyCode = e.key;

    switch (keyCode) {
      case 'ArrowUp':
        this.keysPressed[keyCode] = false;
        break;
      case 'ArrowDown':
        this.keysPressed[keyCode] = false;
        break;
      case 'ArrowRight':
        this.keysPressed[keyCode] = false;
        break;
      case 'ArrowLeft':
        this.keysPressed[keyCode] = false;
        break;
    }
  }

  gameLoop() {
    this.player.move(this.keysPressed);
  }
}
