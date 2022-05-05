import { Container, Graphics } from 'pixi.js';

export default class Player {
  name: string;
  color: string;
  display: Container;
  graphic: Graphics;

  constructor(display: Container, name: string, color: string) {
    this.name = name;
    this.color = color;
    this.display = display;

    this.graphic = new Graphics();
  }

  draw() {
    this.graphic.beginFill(0xde3249);
    this.graphic.drawRect(50, 50, 100, 100);
    this.graphic.endFill();

    this.display.addChild(this.graphic);
  }
}
