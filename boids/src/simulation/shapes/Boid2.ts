const point = (x: number, y: number) => ({ x, y });

function createPath(points: { x: number; y: number }[]) {
  let cy = 0;
  let cx = 0;

  for (const p of points) {
    cx += p.x;
    cy += p.y;
  }
  cx /= points.length;
  cy /= points.length;

  const path = new Path2D();
  for (const p of points) {
    path.lineTo(p.x - cx, p.y - cy);
  }
  path.closePath();
  return path;
}

function drawPath_V2(
  path: Path2D,
  x: number,
  y: number,
  scale: number,
  angle: number,
  strokeStyle: string,
  fillStyle: string,
  ctx: CanvasRenderingContext2D
) {
  ctx.setTransform(scale, 0, 0, scale, x, y);
  ctx.rotate(angle);
  fillStyle && ((ctx.fillStyle = fillStyle), ctx.fill(path));
  strokeStyle && ((ctx.strokeStyle = strokeStyle), ctx.stroke(path));
}

export class Boid2 {
  boid2: Path2D;
  ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.boid2 = createPath([point(0, -25), point(-50, -75), point(-100, -25)]);
    this.ctx = ctx;
  }

  //   update() {}

  draw() {
    drawPath_V2(
      this.boid2,
      125,
      100,
      1,
      ((Math.random() * 100) / 3000) * Math.PI,
      "",
      "black",
      this.ctx
    );
  }
}
