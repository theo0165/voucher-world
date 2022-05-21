import { Application, Container, Loader, Sprite, Texture } from 'pixi.js';
import urlBuilder from '../../helpers/urlBuilder';
import Store from '../../types/Store';
import StoreApiResult from '../../types/StoreApiResult';

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

  async draw() {
    const stores = await this.getStores();

    let tilesPlaced = 0;
    let storesLeft = stores.length;

    while (storesLeft > 0) {
      if (storesLeft >= 3 && tilesPlaced === 0) {
        console.log('placing start tile');

        this.drawMap('start', 600, 200);
        tilesPlaced++;
        storesLeft -= 3;

        continue;
      }

      if (storesLeft > 3 && tilesPlaced > 0) {
        console.log('placing middle tile');

        this.drawMap('middle', 200, 200);
        tilesPlaced++;
        storesLeft -= 3;

        continue;
      }

      if (storesLeft <= 3) {
        console.log('placing end tile');

        this.drawMap('start', 200, 200);
        tilesPlaced++;
        storesLeft -= 3;

        continue;
      }

      break;
    }
  }

  private async getStores(): Promise<Store[]> {
    const req = await fetch(urlBuilder('/api/store'));

    if (req.ok) {
      const stores: StoreApiResult = await req.json();

      if (stores.successful) {
        return stores.data;
      }

      return [];
    }

    return [];
  }

  drawMap(type: 'middle' | 'start' | 'end', x: number, y: number) {
    console.log({ x, y });

    const texture = Texture.from(`${type}.png`);
    const sprite = new Sprite(texture);
    sprite.position.x = x;
    sprite.position.y = y;
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
