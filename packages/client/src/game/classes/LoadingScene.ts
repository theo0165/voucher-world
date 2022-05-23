import { Application, Container, Graphics, Text, TextStyle } from 'pixi.js';

export class LoadingScene {
  text: Text;
  bg: Graphics;

  constructor() {
    this.text = new Text(
      'Loading...',
      new TextStyle({
        fontSize: '100px',
        fill: 'red',
      })
    );

    this.bg = new Graphics();
  }

  create(app: Application) {
    this.bg.beginFill(0x00ff00);
    this.bg.drawRect(0, 0, app.renderer.width / 2, app.renderer.height / 2);
    this.bg.endFill();
    this.bg.zIndex = 99999;

    this.text.anchor.set(0.5);
    this.text.x = this.bg.width / 2;
    this.text.y = this.bg.height / 2;

    this.bg.addChild(this.text);

    app.stage.addChild(this.bg);
  }

  remove(display: Container) {
    display.removeChild(this.bg);
  }
}
