export class Vector {
  x: number;
  y: number;
  ctx: CanvasRenderingContext2D;

  constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
  }

  add(v: Vector) {
    return new Vector(this.x + v.x, this.y + v.y, this.ctx);
  }

  sub(v: Vector) {
    return new Vector(this.x + v.x, this.y + v.y, this.ctx);
  }

  mag() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  mult(n: number) {
    return new Vector(this.x * n, this.y * n, this.ctx);
  }

  drawVec(start_x: number, start_y: number, n: number, color: string) {
    this.ctx.beginPath();
    this.ctx.moveTo(start_x, start_y);
    this.ctx.lineTo(start_x + this.x * n, start_y + this.y * n);
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
