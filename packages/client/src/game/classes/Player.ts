import {
  AnimatedSprite,
  Application,
  Container,
  Text,
  TextStyle,
  SCALE_MODES,
  Sprite,
} from 'pixi.js';
import Store from '../../types/Store';
import Collision from './Collision';
import Voucher from './Voucher';

export default class Player {
  name: string;
  id: string;
  display: Container;
  container: Container;
  app: Application;
  sprite: AnimatedSprite | null = null;
  currentDirection: 'up' | 'down' | 'left' | 'right' = 'down';
  isIdle = false;
  isLoaded = false;

  constructor(display: Container, app: Application, name: string, id: string) {
    this.name = name;
    this.id = id;
    this.display = display;
    this.app = app;

    this.container = new Container();
    this.container.zIndex = 2;
  }

  draw() {
    this.updateSprite('down', true);
  }

  updateSprite(direction: 'up' | 'down' | 'left' | 'right', isIdle = false) {
    this.currentDirection = direction;
    this.isIdle = isIdle;
    this.container.removeChildren(0);

    const sheet = this.app.loader.resources['character'];

    const nameStyle = new TextStyle({
      fill: '#ffffff',
      fontSize: '14px',
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
      this.sprite.anchor.set(0.1, -0.3);
      this.sprite.animationSpeed = 0.167;
      this.sprite.play();
      this.container.addChild(this.sprite);
    }

    this.display.addChild(this.container);
    this.isLoaded = true;
  }

  move(keys: { [key: string]: boolean }) {
    let movement = 5;

    Collision.houses.forEach((house: Sprite) => {
      if (
        Collision.bump.hit(this.container, house, true, false, true, undefined)
      ) {
        movement = 0;
      }
    });

    Collision.voucherTriggers.forEach(
      (trigger: { container: Container; store: Store }) => {
        if (
          Collision.bump.hit(
            this.container,
            trigger.container,
            false,
            false,
            true,
            undefined
          )
        ) {
          Voucher.updateAndShowVoucher(trigger.store);
        }
      }
    );

    let x = 0;
    let y = 0;
    let width = 0;
    let height = 0;

    Collision.map.forEach((map) => {
      if (map.type == 'end') {
        x = map.sprite.position.x - map.sprite.width / 2;
        y = map.sprite.position.y - map.sprite.height / 2;
      }

      height = map.sprite.height;
      width += map.sprite.width / 2;
    });

    height = 620;
    width -= 630;

    Collision.bump.contain(
      this.container,
      {
        x,
        y,
        width,
        height,
      },
      true,
      undefined
    );

    if (keys['ArrowDown']) {
      this.container.position.y += movement;

      if (this.currentDirection != 'down' || this.isIdle) {
        this.updateSprite('down');
      }

      return;
    }

    if (keys['ArrowUp']) {
      this.container.position.y -= movement;

      if (this.currentDirection != 'up' || this.isIdle) {
        this.updateSprite('up');
      }

      return;
    }

    if (keys['ArrowRight']) {
      this.container.position.x += movement;

      if (this.currentDirection != 'right' || this.isIdle) {
        this.updateSprite('right');
      }

      return;
    }

    if (keys['ArrowLeft']) {
      this.container.position.x -= movement;

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
