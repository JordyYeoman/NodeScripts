import { Vector } from "../Vector";

export class Ship {
  x: number;
  y: number;
  vel: Vector;
  acc: Vector;
  r: number; // rotation
  ctx: CanvasRenderingContext2D;
  friction = 0.97; // default value

  constructor(x: number, y: number, r: number, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.vel = new Vector(0, 0, ctx);
    this.acc = new Vector(0, 0, ctx);
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
      this.acc.add(
        new Vector(
          Math.cos(this.r) * 0.0005,
          Math.sin(this.r) * 0.0005,
          this.ctx
        )
      );
    }
    if (!keys["ArrowUp"] || keys["ArrowDown"]) {
      this.acc.subtr(new Vector(this.acc.x, this.acc.y, this.ctx));
    }

    // update velocity
    this.vel.add(this.acc);

    // Apply friction
    this.vel.mult(0.97);

    // update position
    this.x += this.vel.x;
    this.y += this.vel.y;
  }

  draw() {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.r);
    this.ctx.translate(-this.x, -this.y);
    this.ctx.beginPath();
    this.ctx.moveTo(this.x + 30, this.y);
    this.ctx.lineTo(this.x - 10, this.y - 10);
    this.ctx.lineTo(this.x - 10, this.y + 10);
    this.ctx.closePath();

    this.ctx.strokeStyle = "white";
    this.ctx.stroke();
    this.ctx.restore();
  }
}
