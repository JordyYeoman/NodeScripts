import { Vector } from "../Vector";

export class WalkerV2 {
  pos: Vector;
  vel: Vector;
  acc: Vector;
  ctx: CanvasRenderingContext2D;
  maxAcc = 0.001;
  maxVel = 0.01;
  count = 0;
  mousePos = { x: 0, y: 0 };

  constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
    this.pos = new Vector(x, y, ctx);
    this.ctx = ctx;
    this.vel = new Vector(Math.random() / 4, Math.random() / 4, this.ctx);
    this.acc = new Vector(Math.random() / 4, Math.random() / 4, this.ctx);
    window.addEventListener("mousemove", (event) => {
      this.mousePos = { x: event.clientX, y: event.clientY };
    });
  }

  update() {
    const mouseVec = new Vector(this.mousePos.x, this.mousePos.y, this.ctx);
    console.log("mouseVec", mouseVec.x);
    this.acc.subtr(mouseVec);
    this.acc.limit(1);

    console.log("this.acc", this.acc.x);
    // Apply limits
    // this.acc.limit(this.maxAcc);

    // Hanlde velocity changes
    this.vel.add(this.acc);
    this.vel.limit(this.maxVel);

    this.pos.add(this.vel);
  }

  draw() {
    this.ctx.rect(this.pos.x, this.pos.y, 10, 10);
    this.ctx.strokeStyle = "#ffffff";
    this.ctx.stroke();
  }
}
