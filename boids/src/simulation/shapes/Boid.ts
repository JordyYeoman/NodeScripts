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
    // Calculate the angle based on the velocity
    this.r = Math.atan2(this.vy, this.vx) / 10;

    // Update acceleration
    // this.ax = Math.cos(this.r) * 0.05;
    // this.ay = Math.sin(this.r) * 0.05;

    // Update acceleration with a random factor
    const randomFactor = 0.15; // Adjust this value to control the randomness
    this.ax = this.r * randomFactor * Math.random();
    this.ay = this.r * randomFactor * Math.random();

    // calc velocity
    this.vx += this.ax;
    this.vy += this.ay;

    // Apply friction
    this.vx *= this.friction;
    this.vy *= this.friction;

    // update position
    this.x += this.vx;
    this.y += this.vy;
  }

  drawTriangle(PosX: number, PosY: number, radius: number, rotate: number) {
    this.ctx.beginPath();

    /* number of vertices for polygon */
    const sides = 3;
    /* angle between vertices of polygon */
    const a = (Math.PI * 2) / sides;

    for (let i = 0; i < sides; i++) {
      this.ctx.lineTo(
        PosX + radius * Math.cos(a * i + rotate),
        PosY + radius * Math.sin(a * i + rotate)
      );
    }

    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  draw() {
    this.ctx.save();
    // Draw the rotated triangle
    // Translate to the center of the triangle

    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x - this.w / 2, this.y - this.h);
    this.ctx.lineTo(this.x + this.w / 2, this.y - this.h);
    this.ctx.closePath();
    this.ctx.fillStyle = "blue";
    this.ctx.fill();

    this.drawTriangle(this.x, this.y, 10, this.r);

    this.ctx.restore();
  }
}
