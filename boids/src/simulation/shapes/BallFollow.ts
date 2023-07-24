import { Vector } from "../Vector";

export class BallFollow {
  pos: Vector;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  mouseX = 0;
  mouseY = 0;
  maxStepDistance = 2;
  radius = 10;

  constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.pos = new Vector(canvas.width / 2, canvas.height / 2, ctx);
    this.ctx = ctx;
    this.canvas = canvas;
    window.addEventListener("mousemove", (event) => {
      (this.mouseX = event.clientX), (this.mouseY = event.clientY);
    });
  }

  update() {
    // get the distance between the mouse and the ball on both axes
    // walk only the an eight of the distance to create a smooth fadeout
    let dx = (this.mouseX - this.pos.x) * 0.125;
    let dy = (this.mouseY - this.pos.y) * 0.125;
    // calculate the distance this would move ...
    const distance = Math.sqrt(dx * dx + dy * dy);
    //... and cap it at 5px
    if (distance > this.maxStepDistance) {
      dx *= this.maxStepDistance / distance;
      dy *= this.maxStepDistance / distance;
    }

    // Update ball position
    this.pos.add(new Vector(dx, dy, this.ctx));
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(
      this.pos.x - this.radius,
      this.pos.y - 2 * this.radius,
      this.radius,
      0,
      2 * Math.PI
    );
    this.ctx.fillStyle = "white";
    this.ctx.fill();
    this.ctx.lineWidth = 4;
    this.ctx.strokeStyle = "red";
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
