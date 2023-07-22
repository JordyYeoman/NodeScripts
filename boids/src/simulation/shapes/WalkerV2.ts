import { Vector } from "../Vector";

export class WalkerV2 {
  x: number;
  y: number;
  vel: Vector;
  acc: Vector;
  ctx: CanvasRenderingContext2D;

  constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
    this.vel = new Vector(0, 0, this.ctx);
    this.acc = new Vector(0, 0, this.ctx);
  }

  update() {
    console.log("this.x: ", this.x);
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(20, 20, 150, 100);
    this.ctx.stroke();
  }
}
