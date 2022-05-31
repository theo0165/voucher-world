import { Sprite } from 'pixi.js';
import Bump from '../../lib/bump';

class Collision {
  static bump = new Bump('pixi');
  static map: Sprite[] = [];
  static houses: Sprite[] = [];

  static addMapTile(tile: Sprite) {
    this.map.push(tile);
  }

  static addHouse(house: Sprite) {
    this.houses.push(house);
  }
}

export default Collision;
