import { Vector } from "../Vector";

export type Point = { x: number; y: number };

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

const point: (x: number, y: number) => Point = (x: number, y: number) => ({
  x,
  y,
});

const createBoid = (points: Point[]) => {
  let cx = 0;
  let cy = 0;

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
};

// Random walker class - implementing a random bell curve distribution
export class Walker {
  x: number;
  y: number;
  w: number;
  h: number;
  vertices: Point[];
  boid: Path2D;
  velocity: Vector;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  stepDistance = 2;
  color = `rgba(0,0,0, ${Math.random() * 1 + 0.1}`;
  rotation = 0;
  directionX = 1;
  directionY = 1;

  constructor(
    x: number,
    y: number,
    h: number,
    w: number,
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement
  ) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.ctx = ctx;
    this.canvas = canvas;
    this.vertices = [
      point(this.x, this.y),
      point(this.x - this.w / 2, this.y - this.h),
      point(this.x + this.w / 2, this.y - this.h),
    ];
    this.boid = createBoid(this.vertices);
    this.velocity = new Vector(this.x, this.y, this.ctx);
  }

  update() {
    // Check if outside bounds
    if (this.x < 0 || this.x > this.canvas.width - this.w) {
      this.directionX *= -1;
    }
    if (this.y < 0 || this.y > this.canvas.height - this.h) {
      this.directionY *= -1;
    }

    this.x += this.stepDistance * this.directionX;
    this.y += this.stepDistance * this.directionY;

    // Can certainly be improved perf wise :D
    this.vertices = [
      point(this.x, this.y),
      point(this.x - this.w / 2, this.y - this.h),
      point(this.x + this.w / 2, this.y - this.h),
    ];

    // Update velocity based on random direction
    this.velocity.add(new Vector(this.x, this.y, this.ctx));

    // Calculate angle based on velocity
    this.rotation =
      (Math.atan2(this.velocity.y, this.velocity.x) * 180) / Math.PI;
  }

  draw() {
    // Get CENTROID of polygon
    let sumX = 0;
    let sumY = 0;
    const verticesLength = this.vertices.length;

    for (const vertex of this.vertices) {
      sumX += vertex.x;
      sumY += vertex.y;
    }

    const centerX = sumX / verticesLength;
    const centerY = sumY / verticesLength;

    this.ctx.save();

    // Translate rotation axis to center of object
    this.ctx.translate(centerX, centerY);
    this.ctx.rotate(this.rotation);
    this.ctx.translate(-centerX, -centerY);

    // Draw triangle
    this.ctx.strokeStyle = this.color;
    this.ctx.moveTo(centerX + this.w, centerY);
    this.ctx.lineTo(centerX - this.w / 2, centerY + this.h / 2);
    this.ctx.lineTo(centerX - this.w / 2, centerY - this.h / 2);
    this.ctx.closePath();
    this.ctx.stroke();

    // Draw center of object
    this.ctx.fillStyle = "rgba(255,255,255,0.5)";
    this.ctx.beginPath();
    // This.x and this.y is the top left of the shape
    // So we should add half the object width and half the object height to get center
    this.ctx.arc(centerX, centerY, 2, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath();

    // Draw observation window
    this.ctx.strokeStyle = "rgb(238, 130, 238, 0.8)";
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, this.h + this.w / 2, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.restore();
  }
}