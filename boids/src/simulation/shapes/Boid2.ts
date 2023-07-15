export class Boid2 {
  x: number; // X position
  y: number; // Y position
  h: number; // Height
  w: number; // Width
  r: number; // Rotation
  color: string;
  ctx: CanvasRenderingContext2D;
  vx = 0; // X Velocity
  vy = 0; // Y Velocity
  ax = 0; // X Acceleration
  ay = 0; // Y Acceleration
  friction = 0.97; // Friction

  constructor(
    x: number,
    y: number,
    h: number,
    w: number,
    r: number,
    vx: number,
    vy: number,
    ax: number,
    ay: number,
    color: string,
    ctx: CanvasRenderingContext2D
  ) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.r = r;
    this.vx = vx;
    this.vy = vy;
    this.ax = ax;
    this.ay = ay;
    this.color = color;
    this.ctx = ctx;
  }

  update() {
    // Calculate the angle based on the velocity
    this.r = Math.atan2(this.vy, this.vx) / 10;

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

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x - this.w / 2, this.y - this.h);
    this.ctx.lineTo(this.x + this.w / 2, this.y - this.h);
    this.ctx.closePath();
    this.ctx.fillStyle = "blue";
    this.ctx.fill();
  }
}
