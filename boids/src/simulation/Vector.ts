export type VectorInput = {
  x: number;
  y: number;
}

export class Vector {
  x: number;
  y: number;
  ctx: CanvasRenderingContext2D;

  constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
  }

  add(v: VectorInput) {
    this.x = this.x + v.x;
    this.y = this.y + v.y;
  }

  subtr(v: VectorInput) {
    this.x -= v.x;
    this.y -= v.y;
  }

  mag() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  mult(n: number) {
    this.x *= n;
    this.y *= n;
  }

  multX(n: number) {
    this.x *= n;
  }

  multY(n: number) {
    this.y *= n;
  }

  drawVec(start_x: number, start_y: number, n: number, color: string) {
    this.ctx.beginPath();
    this.ctx.moveTo(start_x, start_y);
    this.ctx.lineTo(
      start_x + Math.abs(this.x * n),
      start_y + Math.abs(this.y * n)
    );
    this.ctx.strokeStyle = color;
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
