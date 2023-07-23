export type VectorInput = {
  x: number;
  y: number;
};

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

  limit(n: number) {
    // check if x or y are negative
    const negX = this.x < 0;
    const negY = this.y < 0;

    this.y = Math.abs(this.y) > n ? (negY ? (n *= -1) : n) : this.y;
    this.x = Math.abs(this.x) > n ? (negX ? (n *= -1) : n) : this.x;
  }

  random() {
    this.y = Math.random() > 0.5 ? Math.random() : -1 * Math.random();
    this.x = Math.random() > 0.5 ? Math.random() : -1 * Math.random();
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
