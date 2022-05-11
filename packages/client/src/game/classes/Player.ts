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
  currentDirection: 'up' | 'down' | 'left' | 'right' | 'idle' = 'idle';

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

  loadSprite() {
    this.app.loader
      .add('character', '/spritesheets/character/character.json')
      .load(() => this.draw());
  }

  draw() {
    this.updateSprite('right'); // Change to idle
  }

  updateSprite(direction: 'up' | 'down' | 'left' | 'right' | 'idle') {
    this.currentDirection = direction;
    this.container.removeChildren();

    const sheet = this.app.loader.resources['character'];

    const nameStyle = new TextStyle({
      fill: '#ffffff',
    });

    const name = new Text(this.name, nameStyle);

    this.container.addChild(name);

    if (sheet.spritesheet) {
      this.sprite = new AnimatedSprite(
        sheet.spritesheet.animations[`char_${direction}`]
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
      this.container.position.y += 5;

      if (this.currentDirection != 'down') {
        this.updateSprite('down');
      }

      return;
    }

    if (keys['ArrowUp']) {
      this.container.position.y -= 5;

      if (this.currentDirection != 'up') {
        this.updateSprite('up');
      }

      return;
    }

    if (keys['ArrowRight']) {
      this.container.position.x += 5;

      if (this.currentDirection != 'right') {
        this.updateSprite('right');
      }

      return;
    }

    if (keys['ArrowLeft']) {
      this.container.position.x -= 5;

      if (this.currentDirection != 'left') {
        this.updateSprite('left');
      }

      return;
    }

    if (Object.keys(keys).length == 0) {
      //Stop
    }
  }
}
