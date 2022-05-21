import { Application, Container, Loader, Sprite, Texture } from 'pixi.js';

export default class Map {
  app: Application;
  display: Container;
  startSprite!: Sprite;
  midSprite!: Sprite;
  loader: Loader;
  startTexture!: Texture;
  midTexture!: Texture;

  constructor(app: Application, display: Container) {
    this.app = app;
    this.display = display;
    this.loader = Loader.shared;
    this.loader.add('map', '/spritesheets/map/map.json');
    this.loader.load(() => this.draw());
    // this.loader.load(() => this.drawStartMap());
    // this.loader.load(() => this.drawMidMap());
  }

  draw() {
    this.drawMap('start');
  }

  drawMap(type: 'middle' | 'start' | 'end') {
    console.log(this.app.view.width / 2);

    const texture = Texture.from(`${type}.png`);
    const sprite = new Sprite(texture);
    sprite.position.x = this.display.width / 2;
    sprite.position.y = this.display.height / 2;
    this.display.addChild(sprite);
  }

  drawStartMap() {
    this.startTexture = Texture.from('start.png');
    this.startSprite = new Sprite(this.startTexture);
    this.startSprite.y = 300;
    this.startSprite.x = 400;
    this.display.addChild(this.startSprite);
  }

  drawMidMap() {
    this.midTexture = Texture.from('middle.png');
    this.midSprite = new Sprite(this.midTexture);
    this.midSprite.y = 300;
    this.midSprite.x = 50;
    this.display.addChild(this.midSprite);
  }
}
