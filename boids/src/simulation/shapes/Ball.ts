import { Vector } from "../Vector";

export class Ball {
  x: number;
  y: number;
  r: number;
  vel: Vector;
  acc: Vector;
  acceleration: number;
  ctx: CanvasRenderingContext2D;

  constructor(x: number, y: number, r: number, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.acceleration = 1;
    this.ctx = ctx;
    this.vel = new Vector(0, 0, this.ctx);
    this.acc = new Vector(0, 0, this.ctx);
  }

  drawBall() {
    this.ctx.save();
    this.vel.add(new Vector(0.001, 0.0051, this.ctx));
    this.acc.add(new Vector(0.0051, 0.001, this.ctx));
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    this.ctx.strokeStyle = "black";
    this.ctx.stroke();
    this.ctx.fillStyle = "red";
    this.ctx.fill();
    this.ctx.closePath();
    this.ctx.restore();
  }

  display() {
    this.vel.drawVec(this.x, this.y, 10, "green");
    this.acc.drawVec(this.x, this.y, 100, "blue");
    this.x += this.vel.x;
    this.y += this.vel.y;
  }
}
