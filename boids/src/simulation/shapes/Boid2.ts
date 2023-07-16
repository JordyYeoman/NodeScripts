import { Vector } from '../Vector';

const point: (x: number, y: number) => Point = (x: number, y: number) => ({
  x,
  y,
});

const createBoid = (points: Point[]) => {
  let cx = 0;
  let cy = 0;

  for (const p of points) {
    cx += p.x;
    cy += p.y;
  }
  cx /= points.length;
  cy /= points.length;

  const path = new Path2D();
  for (const p of points) {
    path.lineTo(p.x - cx, p.y - cy);
  }
  path.closePath();

  return path;
};

export type Point = { x: number; y: number };
export class Boid2 {
  x: number;
  y: number;
  w: number;
  h: number;
  boid: Path2D;
  velocity: Vector;
  acceleration: Vector;
  vertices: Point[];
  // boid2: Path2D;
  ctx: CanvasRenderingContext2D;
  r = 90;
  friction = 0.97; // Friction

  constructor(
    x: number,
    y: number,
    w: number,
    h: number,
    ctx: CanvasRenderingContext2D
  ) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.ctx = ctx;
    this.vertices = [
      point(this.x, this.y),
      point(this.x - this.w / 2, this.y - this.h),
      point(this.x + this.w / 2, this.y - this.h),
    ];
    this.boid = createBoid(this.vertices);
    this.velocity = new Vector(0, 0, this.ctx);
    this.acceleration = new Vector(0, 0, this.ctx);
  }

  update() {
    this.velocity.add(new Vector(0.01, 0.051, this.ctx));
    this.acceleration.add(new Vector(0.051, 0.01, this.ctx));
  }

  drawPath_V2(
    path: Path2D,
    x: number,
    y: number,
    scale: number,
    angle: number,
    strokeStyle: string,
    fillStyle: string
  ) {
    this.ctx.setTransform(scale, 0, 0, scale, x, y);
    this.ctx.rotate(angle);
    fillStyle && ((this.ctx.fillStyle = fillStyle), this.ctx.fill(path));
    strokeStyle &&
      ((this.ctx.strokeStyle = strokeStyle), this.ctx.stroke(path));
  }

  draw() {
    this.drawPath_V2(this.boid, this.x, this.y, 1, this.r, 'white', 'white');
    // Reset transform
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    // Draw vectors - after transform (since transform is only for drawing the triangle)
    this.velocity.drawVec(this.x, this.y, 100, 'green');
  }
}
