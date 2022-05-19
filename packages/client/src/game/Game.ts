import { Application, Container } from 'pixi.js';
import Player from './classes/Player';
import GameType from '../types/GameType';
import PlayerType from '../types/Player';
import socket from '../script/socket';

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

  constructor(playerName: string, color: string, game: GameType) {
    console.log({ game });

    this.game = new Application({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    this.display = this.game.stage;

    game.room.players
      .filter((player) => player.id != game.player.id)
      .forEach((player) => {
        new Player(
          this.display,
          this.game,
          player.username,
          'green',
          player.id
        );
      });

    this.player = new Player(
      this.display,
      this.game,
      playerName + ' (local)',
      color,
      socket.id
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

  addPlayer({ username, color, id }: PlayerType) {
    console.log('adding player');

    new Player(this.display, this.game, username, color, id);
  }
}
