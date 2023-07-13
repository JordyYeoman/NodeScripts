export class Boid {
  x: number; // X position
  y: number; // Y position
  h: number; // Height
  w: number; // Width
  r: number; // Rotation
  color: string;
  ctx: CanvasRenderingContext2D;

  constructor(
    x: number,
    y: number,
    h: number,
    w: number,
    r: number,
    color: string,
    ctx: CanvasRenderingContext2D
  ) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.r = r;
    this.color = color;
    this.ctx = ctx;
  }

  update() {
    this.x += 2 * (Math.random() < 0.5 ? -1 : 1);
    this.y += 2 * (Math.random() < 0.5 ? -1 : 1);
    this.r += 2;
  }

  /* here, radius means the radius of circle, inside of which polygon is drawn */
  drawTriangle(
    context: CanvasRenderingContext2D,
    PosX: number,
    PosY: number,
    radius: number,
    rotate: number
  ) {
    context.beginPath();

    /* number of vertices for polygon */
    const sides = 3;
    /* angle between vertices of polygon */
    const a = (Math.PI * 2) / sides;

    for (let i = 0; i < sides; i++) {
      context.lineTo(
        PosX + radius * Math.cos(a * i + rotate),
        PosY + radius * Math.sin(a * i + rotate)
      );
    }

    context.closePath();
    context.stroke();

    context.fillStyle = "#fff";
    context.fill();

    return true;
  }

  draw() {
    this.ctx.save();
    this.drawTriangle(this.ctx, this.x, this.y, 20, Math.PI / this.r);
    // this.ctx.beginPath();
    // this.ctx.moveTo(this.x + this.w / 2, this.y);
    // this.ctx.lineTo(this.x, this.y - this.h * 2);
    // this.ctx.lineTo(this.x - this.w / 2, this.y);
    // this.ctx.closePath();

    // // the outline
    // this.ctx.lineWidth = 1;
    // this.ctx.strokeStyle = "#666666";
    // this.ctx.stroke();

    // // the fill color
    // this.ctx.fillStyle = "#fff";
    // this.ctx.fill();

    // // Rotate boid
    // this.ctx.translate(this.x / 2, this.y / 2);
    // this.ctx.rotate(this.r);

    // this.ctx.closePath();
    this.ctx.restore();
  }
}
