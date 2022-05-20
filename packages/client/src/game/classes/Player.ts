import {
  AnimatedSprite,
  Application,
  Container,
  Text,
  TextStyle,
  SCALE_MODES,
} from 'pixi.js';

export default class Player {
  name: string;
  color: string;
  id: string;
  display: Container;
  container: Container;
  app: Application;
  sprite: AnimatedSprite | null = null;
  currentDirection: 'up' | 'down' | 'left' | 'right' = 'down';
  isIdle = false;

  constructor(
    display: Container,
    app: Application,
    name: string,
    color: string,
    id: string,
    x: number,
    y: number
  ) {
    this.name = name;
    this.color = color;
    this.id = id;
    this.display = display;
    this.app = app;

    this.container = new Container();
    this.loadSprite();

    this.container.position.x = x;
    this.container.position.y = y;
  }

  private loadSprite() {
    if (!this.app.loader.resources['character']) {
      this.app.loader
        .add('character', '/spritesheets/character/character.json')
        .load(() => this.draw());
    } else {
      this.draw();
    }
  }

  draw() {
    this.updateSprite('down', true); // Change to idle
  }

  updateSprite(direction: 'up' | 'down' | 'left' | 'right', isIdle = false) {
    this.currentDirection = direction;
    this.isIdle = isIdle;
    this.container.removeChildren(0);

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
      this.sprite.texture.baseTexture.scaleMode = SCALE_MODES.NEAREST;
      this.sprite.width = 64;
      this.sprite.height = 64;
      this.sprite.anchor.set(-0.15, -0.5);
      this.sprite.animationSpeed = 0.167;
      this.sprite.play();
      this.container.addChild(this.sprite);
    }

    this.display.addChild(this.container);
  }

  move(keys: { [key: string]: boolean }) {
    if (keys['ArrowDown']) {
      this.container.position.y += 5;

      if (this.currentDirection != 'down' || this.isIdle) {
        this.updateSprite('down');
      }

      return;
    }

    if (keys['ArrowUp']) {
      this.container.position.y -= 5;

      if (this.currentDirection != 'up' || this.isIdle) {
        this.updateSprite('up');
      }

      return;
    }

    if (keys['ArrowRight']) {
      this.container.position.x += 5;

      if (this.currentDirection != 'right' || this.isIdle) {
        this.updateSprite('right');
      }

      return;
    }

    if (keys['ArrowLeft']) {
      this.container.position.x -= 5;

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
