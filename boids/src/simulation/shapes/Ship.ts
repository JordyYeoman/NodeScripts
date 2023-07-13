import { KeyboardInput } from "../KeyboardInput";

export class Ship {
  x: number;
  y: number;
  vx: number; // Velocity in x direction
  vy: number; // Velocity in y direction
  ax: number; // Acceleration in x direction
  ay: number; // Acceleration in y direction
  r: number; // rotation
  ctx: CanvasRenderingContext2D;
  friction = 0.97; // default value

  constructor(
    x: number,
    y: number,
    vx: number,
    vy: number,
    ax: number,
    ay: number,
    r: number,
    ctx: CanvasRenderingContext2D
  ) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.ax = ax;
    this.ay = ay;
    this.r = r;
    this.ctx = ctx;
  }

  update(keys: { [key: string]: boolean }) {
    // Apply keys update
    if (keys["ArrowLeft"]) {
      this.r -= 0.05;
    }
    if (keys["ArrowRight"]) {
      this.r += 0.05;
    }
    if (keys["ArrowUp"]) {
      this.ax = Math.cos(this.r) * 0.05;
      this.ay = Math.sin(this.r) * 0.05;
    }
    if (!keys["ArrowUp"] || keys["ArrowDown"]) {
      this.ax = 0;
      this.ay = 0;
    }

    // update velocity
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
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.r);
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(-5, -2.5, 10, 5);
    this.ctx.restore();
  }
}
