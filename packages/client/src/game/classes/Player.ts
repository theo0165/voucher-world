import {
  AnimatedSprite,
  Application,
  Container,
  Graphics,
  Loader,
} from 'pixi.js';

export default class Player {
  name: string;
  color: string;
  display: Container;
  graphic: Graphics;
  app: Application;

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
    this.graphic = new Graphics();
  }

  loadSprite() {
    this.app.loader
      .add('character', '/spritesheets/character/character.json')
      .load(() => this.draw());
  }

  draw() {
    const sheet = this.app.loader.resources['character'];

    console.log(sheet);

    let sprite: AnimatedSprite | null;

    if (sheet.spritesheet) {
      console.log(sheet.spritesheet.animations['char_right']);
      sprite = new AnimatedSprite(sheet.spritesheet.animations['char_right']);
      sprite.animationSpeed = 0.167;
      sprite.play();
      this.display.addChild(sprite);
    }
  }

  move(keys: { [key: string]: boolean }) {
    if (keys['ArrowDown']) {
      this.graphic.position.y += 5;
    }

    if (keys['ArrowUp']) {
      this.graphic.position.y -= 5;
    }

    if (keys['ArrowRight']) {
      this.graphic.position.x += 5;
    }

    if (keys['ArrowLeft']) {
      this.graphic.position.x -= 5;
    }
  }
}
