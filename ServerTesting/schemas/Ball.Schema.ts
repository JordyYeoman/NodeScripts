export class Ball {
  width: number;
  height: number;
  velocity: number;
  friction: number;
  x: number;
  y: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.velocity = 0;
    this.friction = 9.8;
    this.x = 0;
    this.y = 0;
  }

  update() {
    this.velocity = this.velocity - (this.velocity * this.friction) / 100;
  }
}
