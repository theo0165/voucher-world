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
  isLoaded = false;

  constructor(app: Application, display: Container) {
    this.app = app;
    this.display = display;
    this.loader = Loader.shared;
  }

  async draw() {
    const stores = await this.getStores();

    const tileWidth = 350;
    // const tileHeight = 252;

    const startX = 600;
    const startY = 200;

    let tilesPlaced = 0;
    let storesLeft = stores.length;

    while (storesLeft > 0) {
      if (storesLeft >= 3 && tilesPlaced === 0) {
        console.log('placing start tile');

        this.drawMap('start', startX, startY);
        tilesPlaced++;
        storesLeft -= 3;

        continue;
      }

      if (storesLeft > 3 && tilesPlaced > 0) {
        console.log('placing middle tile');

        this.drawMap(
          'middle',
          startX - tileWidth * Math.max(1, tilesPlaced),
          startY
        );
        tilesPlaced++;
        storesLeft -= 3;

        continue;
      }

      if (storesLeft <= 3) {
        console.log('placing end tile');

        this.drawMap(
          'start',
          startX - tileWidth * Math.max(1, tilesPlaced),
          startY
        );
        tilesPlaced++;
        storesLeft -= 3;

        continue;
      }

      break;
    }

    this.isLoaded = true;
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

  private drawMap(type: 'middle' | 'start' | 'end', x: number, y: number) {
    console.log({ x, y });

    if (this.app.loader.resources['map'].textures) {
      const sprite = new Sprite(
        this.app.loader.resources['map'].textures[`${type}.png`]
      );
      sprite.position.x = x;
      sprite.position.y = y;
      sprite.zIndex = 1;
      this.display.addChild(sprite);
    }
  }
}
