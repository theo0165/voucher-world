import { Container, Sprite } from 'pixi.js';
import Bump from '../../lib/bump';
import Store from '../../types/Store';

class Collision {
  static bump = new Bump('pixi');
  static map: {
    type: 'start' | 'middle' | 'end';
    sprite: Sprite;
  }[] = [];
  static houses: Sprite[] = [];
  static voucherTriggers: { container: Container; store: Store }[] = [];

  static addMapTile(sprite: Sprite, type: 'start' | 'middle' | 'end') {
    this.map.push({ sprite, type });
  }

  static addHouse(house: Sprite) {
    this.houses.push(house);
  }

  static addVoucherTrigger(container: Container, store: Store) {
    this.voucherTriggers.push({ container, store });
  }
}

export default Collision;
