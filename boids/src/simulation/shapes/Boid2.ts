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
  vertices: Point[];
  // boid2: Path2D;
  ctx: CanvasRenderingContext2D;
  r = 90;
  vx = 0; // X Velocity
  vy = 0; // Y Velocity
  ax = 0; // X Acceleration
  ay = 0; // Y Acceleration
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
  }

  update() {
    // Calculate the angle based on the velocity
    this.r = Math.atan2(this.vy, this.vx) * 100;

    // Update acceleration
    // this.ax = Math.cos(this.r) * 0.05;
    // this.ay = Math.sin(this.r) * 0.05;

    // Update acceleration with a random factor
    const randomFactor = 0.00001; // Adjust this value to control the randomness
    this.ax = this.r * randomFactor;
    this.ay = this.r * randomFactor;

    // calc velocity
    this.vx += this.ax;
    this.vy += this.ay;

    // Apply friction
    this.vx *= this.friction;
    this.vy *= this.friction;

    // update position
    this.x += this.vx;
    this.y += this.vy;
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
    this.drawPath_V2(this.boid, this.x, this.y, 1, this.r, "white", "white");

    // Reset transform
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
}
