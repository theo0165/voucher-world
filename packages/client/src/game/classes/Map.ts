import { Application, Container, Loader, Sprite, Texture } from 'pixi.js';

export default class Map {
  app: Application;
  display: Container;
  sprite!: Sprite;
  loader: Loader;
  startTexture!: Texture;

  constructor(app: Application, display: Container) {
    this.app = app;
    this.display = display;
    this.loader = Loader.shared;
    this.loader.add('map', '/spritesheets/map/map.json');
    this.loader.load(() => this.drawStartMap());
  }

  drawStartMap() {
    this.startTexture = Texture.from('start.png');
    this.sprite = new Sprite(this.startTexture);
    this.sprite.y = 100;
    this.sprite.x = 100;
    this.display.addChild(this.sprite);
  }
}
