import { Sprite } from 'pixi.js';
import Bump from '../../lib/bump';

class Collision {
  static bump = new Bump('pixi');
  static map: {
    //      top      right    bottom   left
    type: 'start' | 'middle' | 'end';
    sprite: Sprite;
  }[] = [];
  static houses: Sprite[] = [];

  static addMapTile(sprite: Sprite, type: 'start' | 'middle' | 'end') {
    this.map.push({ sprite, type });
  }

  static addHouse(house: Sprite) {
    this.houses.push(house);
  }
}

export default Collision;
