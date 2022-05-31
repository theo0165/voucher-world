import { AnimatedSprite, Circle, Container, Point, Sprite } from 'pixi.js';

export default class Bump {
  constructor(renderingEngine: string | undefined);

  addCollisionProperties(sprite: Container);

  hitTestPoint(point: Point, Container: Container);

  hitTestCircle(c1: Container, c2: Container, global = false);

  circleCollision(c1: Container, c2: Container, bounce = false, global = false);

  movingCircleCollision(c1: Container, c2: Container, global = false);

  multipleCircleCollision(arrayOfCircles: Container[], global = false);

  rectangleCollision(
    r1: Container,
    r2: Container,
    bounce = false,
    global = true
  );

  hitTestRectangle(r1: Container, r2: Container, global = false);

  hitTestCircleRectangle(c1: Container, r1: Container, global = false);

  hitTestCirclePoint(c1: Container, point: Point, global = false);

  circleRectangleCollision(
    c1: Container,
    r1: Container,
    bounce = false,
    global = false
  );

  circlePointCollision(
    c1: Container,
    point: Point,
    bounce = false,
    global = false
  );

  bounceOffSurface(o: any, s: any);

  contain(
    sprite: Container,
    container: { x: number; y: number; width: number; height: number },
    bounce = false,
    extra: ((collision: Set<string> | undefined) => void) | undefined
  ): Set<string>;

  outsideBounds(
    s: Container,
    bounds: any,
    extra: ((collision: Set<string> | undefined) => void) | undefined
  );

  _getCenter(o: Container, dimension: any, axis: any);

  hit(
    a: Container,
    b: Container,
    react = false,
    bounce = false,
    global: boolean,
    extra: ((collision: Set<string> | undefined) => void) | undefined
  );
}
