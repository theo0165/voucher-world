import {
  AnimatedSprite,
  Application,
  Container,
  Text,
  TextStyle,
} from 'pixi.js';

export default class Player {
  name: string;
  color: string;
  display: Container;
  container: Container;
  app: Application;
  sprite: AnimatedSprite | null = null;
  currentDirection: 'up' | 'down' | 'left' | 'right' = 'down';
  isIdle: boolean = false;

  constructor(
    display: Container,
    app: Application,
    name: string,
    color: string
  ) {
    this.name = name;
    this.color = color;
    this.display = display;
    this.app = app;

    this.loadSprite();
    this.container = new Container();
  }

  private loadSprite() {
    this.app.loader
      .add('character', '/spritesheets/character/character.json')
      .load(() => this.draw());
  }

  draw() {
    this.updateSprite('down', true); // Change to idle
  }

  private updateSprite(
    direction: 'up' | 'down' | 'left' | 'right',
    isIdle: boolean = false
  ) {
    this.currentDirection = direction;
    this.isIdle = isIdle;
    this.container.removeChildren();

    const sheet = this.app.loader.resources['character'];

    const nameStyle = new TextStyle({
      fill: '#ffffff',
    });

    const name = new Text(this.name, nameStyle);

    this.container.addChild(name);

    if (sheet.spritesheet) {
      this.sprite = new AnimatedSprite(
        isIdle
          ? sheet.spritesheet.animations[`char_idle_${direction}`]
          : sheet.spritesheet.animations[`char_${direction}`]
      );
      this.sprite.anchor.set(-0.7, -1.5);
      this.sprite.animationSpeed = 0.167;
      this.sprite.play();
      this.container.addChild(this.sprite);
    }

    this.display.addChild(this.container);
  }

  move(keys: { [key: string]: boolean }) {
    if (keys['ArrowDown']) {
      this.container.position.y += 1;

      if (this.currentDirection != 'down' || this.isIdle) {
        this.updateSprite('down');
      }

      return;
    }

    if (keys['ArrowUp']) {
      this.container.position.y -= 1;

      if (this.currentDirection != 'up' || this.isIdle) {
        this.updateSprite('up');
      }

      return;
    }

    if (keys['ArrowRight']) {
      this.container.position.x += 1;

      if (this.currentDirection != 'right' || this.isIdle) {
        this.updateSprite('right');
      }

      return;
    }

    if (keys['ArrowLeft']) {
      this.container.position.x -= 1;

      if (this.currentDirection != 'left' || this.isIdle) {
        this.updateSprite('left');
      }

      return;
    }

    if (
      keys['ArrowDown'] == false &&
      keys['ArrowUp'] == false &&
      keys['ArrowRight'] == false &&
      keys['ArrowLeft'] == false
    ) {
      if (this.isIdle == false) {
        this.updateSprite(this.currentDirection, true);
      }

      return;
    }
  }
}
