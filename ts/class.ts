class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Rect {
  point: Point;
  w: number;
  h: number;
  constructor(point: Point, w: number, h: number) {
    this.point = point;
    this.w = w;
    this.h = h;
  }
  area(): number {
    return this.w * this.h;
  }
  amIBigger(rect: Rect): boolean {
    let myArea = this.area();
    let hisArea = rect.area();
    return myArea > hisArea;
  }
}

class Square extends Rect {
  constructor(point: Point, wh: number) {
    super(point, wh, wh);
  }
}

let rect1 = new Rect(new Point(0, 0), 5, 5);
let rect2 = new Rect(new Point(10, 10), 5, 5);

console.log(rect1.amIBigger(rect2));

export {};
