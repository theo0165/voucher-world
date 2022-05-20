import { Application, Container } from 'pixi.js';
import Player from './classes/Player';
import GameType from '../types/GameType';
import PlayerType from '../types/Player';
import socket from '../script/socket';

export default class Game {
  player: Player;
  players: Player[] = [];
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
        this.players.push(
          new Player(
            this.display,
            this.game,
            player.username,
            'green',
            player.id,
            player.x,
            player.y
          )
        );
      });

    this.player = new Player(
      this.display,
      this.game,
      playerName + ' (local)',
      color,
      socket.id,
      50,
      50
    );

    setInterval(() => {
      socket.emit('state', {
        x: this.player.container.position.x,
        y: this.player.container.position.y,
        direction: this.player.currentDirection,
        isIdle: this.player.isIdle,
        roomId: game.room.id,
        id: this.player.id,
      });
    }, 1000 / 60);

    socket.on('player move', (state) => {
      const playerToUpdate = this.players.filter((player) => {
        if (this.player.id == player.id) {
          return false;
        }

        if (player.id == state.id) {
          return true;
        }

        return false;
      });

      if (playerToUpdate.length > 0) {
        playerToUpdate[0].container.position.x = state.x;
        playerToUpdate[0].container.position.y = state.y;

        if (
          playerToUpdate[0].currentDirection != state.direction ||
          playerToUpdate[0].isIdle != state.isIdle
        ) {
          playerToUpdate[0].updateSprite(state.direction, state.isIdle);
        }
      }
    });

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

  addPlayer({ username, color, id, x, y }: PlayerType) {
    this.players.push(
      new Player(this.display, this.game, username, color, id, x, y)
    );
  }

  removePlayer(id: string) {
    this.players.forEach((player, index) => {
      if (player.id == id) {
        this.display.removeChild(player.container);
        this.players.splice(index, 1);
      }
    });
  }
}
