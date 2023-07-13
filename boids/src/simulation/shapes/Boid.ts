export class Boid {
  x: number; // X position
  y: number; // Y position
  r: number; // Radius
  color: string;
  ctx: CanvasRenderingContext2D;

  constructor(
    x: number,
    y: number,
    r: number,
    color: string,
    ctx: CanvasRenderingContext2D
  ) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.ctx = ctx;
  }

  update() {
    this.x += Math.random() * (Math.random() < 0.5 ? -1 : 1);
    this.y += Math.random() * (Math.random() < 0.5 ? -1 : 1);
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    this.ctx.strokeStyle = "white";
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
