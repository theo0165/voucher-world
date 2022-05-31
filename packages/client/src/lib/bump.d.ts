import { AnimatedSprite, Circle, Point, Sprite } from 'pixi.js';

export class Bump {
  constructor(renderingEngine: string | undefined);

  addCollisionProperties(sprite: Sprite);

  hitTestPoint(point: Point, sprite: Sprite);

  hitTestCircle(c1: Sprite, c2: Sprite, global = false);

  circleCollision(c1: Sprite, c2: Sprite, bounce = false, global = false);

  movingCircleCollision(c1: Sprite, c2: Sprite, global = false);

  multipleCircleCollision(arrayOfCircles: Sprite[], global = false);

  rectangleCollision(r1: Sprite, r2: Sprite, bounce = false, global = true);

  hitTestRectangle(r1: Sprite, r2: Sprite, global = false);

  hitTestCircleRectangle(c1: Sprite, r1: Sprite, global = false);

  hitTestCirclePoint(c1: Sprite, point: Point, global = false);

  circleRectangleCollision(
    c1: Sprite,
    r1: Sprite,
    bounce = false,
    global = false
  );

  circlePointCollision(
    c1: Sprite,
    point: Point,
    bounce = false,
    global = false
  );

  bounceOffSurface(o: any, s: any);

  contain(
    sprite: Sprite,
    container: { x: number; y: number; width: number; height: number },
    bounce = false,
    extra: ((collision: Set<boolean> | undefined) => void) | undefined
  );

  outsideBounds(
    s: Sprite,
    bounds: any,
    extra: ((collision: Set<boolean> | undefined) => void) | undefined
  );

  _getCenter(o: Sprite, dimension: any, axis: any);

  hit(
    a: Sprite,
    b: Sprite,
    react = false,
    bounce = false,
    global: boolean,
    extra = undefined
  );
}
