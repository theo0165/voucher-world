import { Application, Container } from 'pixi.js';
import Player from './classes/Player';
import GameType from '../types/GameType';

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

    if (window.localStorage.getItem('game')) {
      const game: GameType = JSON.parse(
        window.localStorage.getItem('game') ?? '{}'
      );

      game.room.players
        .filter((player) => player.username != game.player.username)
        .forEach((player) => {
          new Player(this.display, this.game, player.username, 'green');
        });
    }

    this.player = new Player(
      this.display,
      this.game,
      playerName + ' (local)',
      color
    );

    document.body.appendChild(this.game.view);

    this.game.ticker.add(this.gameLoop, this);

    window.addEventListener('keydown', (e: KeyboardEvent) => this.keyDown(e));
    window.addEventListener('keyup', (e: KeyboardEvent) => this.keyUp(e));
  }

  private keyDown(e: KeyboardEvent) {
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

  private keyUp(e: KeyboardEvent) {
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

  private gameLoop() {
    this.player.move(this.keysPressed);
  }
}
