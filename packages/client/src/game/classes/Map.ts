import {
  Application,
  Container,
  Graphics,
  Loader,
  SCALE_MODES,
  Sprite,
  Texture,
} from 'pixi.js';
import urlBuilder from '../../helpers/urlBuilder';
import Store from '../../types/Store';
import StoreApiResult from '../../types/StoreApiResult';
import Collision from './Collision';

export default class Map {
  app: Application;
  display: Container;
  startSprite!: Sprite;
  midSprite!: Sprite;
  loader: Loader;
  startTexture!: Texture;
  midTexture!: Texture;
  isLoaded = false;
  store!: Store;

  constructor(app: Application, display: Container) {
    this.app = app;
    this.display = display;
    this.loader = Loader.shared;
  }

  async draw() {
    const stores = await this.getStores();

    const startHousePosition = [
      [600 + -350, 200 + -370],
      [600 + -200, 200 + 150],
      [600 + 173, 200 + -150],
    ];

    const midHousePosition = [
      [-320, -110],
      [215, -65],
      [-215, 215],
    ];

    const endHousePosition = [
      [-235, 150],
      [160, 260],
      [160, -240],
    ];

    const tileWidth = 1075;
    // const tileHeight = 252;

    const startX = 600;
    // const startX = 10;
    const startY = 200;
    // const startY = 10;

    let tilesPlaced = 0;
    let storesLeft = stores.length;
    let storeIndex = 0;

    while (storesLeft > 0) {
      if (storesLeft >= 3 && tilesPlaced === 0) {
        console.log('placing start tile');

        this.drawMap('start', startX, startY);

        for (let i = 0; i < Math.min(storesLeft, 3); i++) {
          this.drawStore(
            stores[storeIndex],
            startHousePosition[i][0],
            startHousePosition[i][1]
          );
          storeIndex++;
        }

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

        for (let i = 0; i < Math.min(storesLeft, 3); i++) {
          this.drawStore(
            stores[storeIndex],
            startX -
              tileWidth * Math.max(1, tilesPlaced) +
              midHousePosition[i][0],
            startY + midHousePosition[i][1]
          );
          storeIndex++;
        }

        tilesPlaced++;
        storesLeft -= 3;

        continue;
      }

      if (storesLeft <= 3) {
        console.log('placing end tile');

        this.drawMap(
          'end',
          startX - tileWidth * Math.max(1, tilesPlaced),
          startY
        );

        for (let i = 0; i < Math.min(storesLeft, 3); i++) {
          this.drawStore(
            stores[storeIndex],
            startX -
              tileWidth * Math.max(1, tilesPlaced) +
              endHousePosition[i][0],
            startY + endHousePosition[i][1]
          );
          storeIndex++;
        }

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

  private drawStore(store: Store, x: number, y: number) {
    console.log({ x, y });
    console.log(store);

    if (this.app.loader.resources['map'].textures) {
      const sprite = new Sprite(
        this.app.loader.resources['map'].textures['house.png']
      );
      sprite.texture.baseTexture.scaleMode = SCALE_MODES.LINEAR;
      sprite.position.x = x;
      sprite.position.y = y;
      sprite.zIndex = 2;
      const bg = new Graphics();
      bg.beginFill(0xff0000);
      bg.drawRect(
        x - sprite.width / 2,
        y - sprite.height / 2,
        sprite.width,
        sprite.height
      );
      bg.zIndex = 1;
      sprite.zIndex = 2;

      Collision.addHouse(sprite);

      this.display.addChild(bg);
      this.display.addChild(sprite);
    }
  }

  private drawMap(type: 'middle' | 'start' | 'end', x: number, y: number) {
    console.log({ x, y });

    if (this.app.loader.resources['map'].textures) {
      const sprite = new Sprite(
        this.app.loader.resources['map'].textures[`${type}.png`]
      );
      sprite.texture.baseTexture.scaleMode = SCALE_MODES.LINEAR;
      sprite.position.x = x;
      sprite.position.y = y;
      sprite.zIndex = 1;

      Collision.addMapTile(sprite, type);
      this.display.addChild(sprite);
    }
  }
}
