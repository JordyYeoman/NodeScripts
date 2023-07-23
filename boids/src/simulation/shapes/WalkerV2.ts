import { Vector } from "../Vector";

function getMousePos(canvas: HTMLCanvasElement, evt: MouseEvent) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((evt.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
    y: ((evt.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
  };
}

export class WalkerV2 {
  pos: Vector;
  vel: Vector;
  acc: Vector;
  ctx: CanvasRenderingContext2D;
  maxAcc = 2;
  maxVel = 1;
  count = 0;
  mousePos = { x: 0, y: 0 };

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.pos = new Vector(canvas.width / 2, canvas.height / 2, ctx);
    this.ctx = ctx;
    this.vel = new Vector(Math.random() / 4, Math.random() / 4, this.ctx);
    this.acc = new Vector(Math.random() / 4, Math.random() / 4, this.ctx);
    window.addEventListener("mousemove", (event) => {
      this.mousePos = getMousePos(canvas, event);
    });
  }

  update() {
    const mouseVec = new Vector(this.mousePos.x, this.mousePos.y, this.ctx);

    if (this.count < 100) {
      this.count++;
    } else {
      //   console.log("this.acc: ", this.acc);
      //   console.log("this.vel: ", this.vel);
      this.count = 0;
    }

    this.acc.subtr(mouseVec);
    this.acc.limit(this.maxAcc);

    // Hanlde velocity changes
    // console.log("before this.vel: ", this.vel);
    this.vel.add(this.acc);
    this.vel.limit(this.maxVel);
    console.log("after this.vel: ", this.vel);

    // Update position
    this.pos.add(this.vel);
  }

  draw() {
    this.ctx.rect(this.pos.x, this.pos.y, 5, 5);
    this.ctx.strokeStyle = "#ffffff";
    this.ctx.stroke();
  }
}
