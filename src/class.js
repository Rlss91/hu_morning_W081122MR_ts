class Point {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Rect {
    point;
    w;
    h;
    constructor(point, w, h) {
        this.point = point;
        this.w = w;
        this.h = h;
    }
    area() {
        return this.w * this.h;
    }
    amIBigger(rect) {
        let myArea = this.area();
        let hisArea = rect.area();
        return myArea > hisArea;
    }
}
class Square extends Rect {
    constructor(point, wh) {
        super(point, wh, wh);
    }
}
let rect1 = new Rect(new Point(0, 0), 5, 5);
let rect2 = new Rect(new Point(10, 10), 5, 5);
console.log(rect1.amIBigger(rect2));
export {};
