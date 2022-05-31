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
      [600 + -520, 200 + -425],
      [600 + -350, 200 + 90],
      [600 + 20, 200 + -215],
    ];

    const midHousePosition = [
      [-320, -170],
      [215, -125],
      [-215, 155],
    ];

    const endHousePosition = [
      [-235, 90],
      [160, 200],
      [160, -300],
    ];

    const tileWidth = 1079;

    const startX = 600;
    const startY = 200;

    let tilesPlaced = 0;
    let storesLeft = stores.length;
    let storeIndex = 0;

    while (storesLeft > 0) {
      if (storesLeft >= 3 && tilesPlaced === 0) {
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
    if (this.app.loader.resources['map'].textures) {
      const sprite = new Sprite(
        this.app.loader.resources['map'].textures['house.png']
      );
      sprite.texture.baseTexture.scaleMode = SCALE_MODES.LINEAR;
      sprite.position.x = x;
      sprite.position.y = y;
      sprite.zIndex = 2;

      const voucherArea = new Graphics();
      voucherArea.drawRect(
        -sprite.width / 2,
        +sprite.height / 2,
        sprite.width,
        90
      );
      sprite.addChild(voucherArea);

      Collision.addHouse(sprite);
      Collision.addVoucherTrigger(voucherArea, store);

      this.display.addChild(sprite);
    }
  }

  private drawMap(type: 'middle' | 'start' | 'end', x: number, y: number) {
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
