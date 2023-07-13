function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export class Boid {
  x: number; // X position
  y: number; // Y position
  h: number; // Height
  w: number; // Width
  r: number; // Rotation
  color: string;
  ctx: CanvasRenderingContext2D;
  vx = 0; // X Velocity
  vy = 0; // Y Velocity
  ax = 0; // X Acceleration
  ay = 0; // Y Acceleration
  friction = 0.97; // Friction

  constructor(
    x: number,
    y: number,
    h: number,
    w: number,
    r: number,
    vx: number,
    vy: number,
    ax: number,
    ay: number,
    color: string,
    ctx: CanvasRenderingContext2D
  ) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.r = r;
    this.vx = vx;
    this.vy = vy;
    this.ax = ax;
    this.ay = ay;
    this.color = color;
    this.ctx = ctx;
  }

  update() {
    this.r += (Math.random() * randomIntFromInterval(0, 180)) / 50;

    // Update acceleration
    this.ax = Math.cos(this.r) * 0.05;
    this.ay = Math.sin(this.r) * 0.05;

    // calc velocity
    this.vx += this.ax;
    this.vy += this.ay;

    // Apply friction
    this.vx *= 0.97;
    this.vy *= 0.97;

    // update position
    this.x += this.vx;
    this.y += this.vy;
  }

  draw() {
    this.ctx.save();

    // Translate to the center of the triangle
    this.ctx.translate(this.x + this.w / 2, this.y + this.h / 2);

    // Rotate the canvas
    this.ctx.rotate((Math.PI / 180) * this.r);

    // Translate back to the original position
    this.ctx.translate(-(this.x + this.w / 2), -(this.y + this.h / 2));

    // Draw the rotated triangle
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x + this.w, this.y + this.h / 2);
    this.ctx.lineTo(this.x, this.y + this.h);
    this.ctx.closePath();
    this.ctx.fillStyle = "blue";
    this.ctx.fill();

    this.ctx.restore();
  }
}
